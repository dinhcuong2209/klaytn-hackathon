import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/model';
import { Model } from 'mongoose';
import { RedisCacheService } from '../cache/services';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthConfig, CacheKey, Message } from './constant';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly cacheService: RedisCacheService,
    private readonly jwtService: JwtService,
  ) {}

  async register(body: RegisterDto) {
    await this.throwErrorIfUsernameExist(body.username);
    const hash = await bcrypt.hash(body.password, 10);
    const newUser = await this.userModel.create({ ...body, password: hash });
    return this.generateToken(newUser.toJSON());
  }

  async login(body: LoginDto) {
    const account = await this.userModel.findOne({ username: body.username });
    if (!account) {
      throw new BadRequestException(Message.Error.UsernameNotExist);
    }
    if (!bcrypt.compareSync(body.password, account.password)) {
      throw new BadRequestException(Message.Error.WrongUsernameOrPassword);
    }
    return this.generateToken(account.toJSON());
  }

  // helper region
  private async throwErrorIfUsernameExist(username: string) {
    const account = await this.userModel.findOne({ username });
    if (account) {
      throw new BadRequestException(Message.Error.UsernameExist);
    }
  }

  private async generateToken(account) {
    const payload = {
      username: account.username,
    };
    const userId = account._id.toString();
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: AuthConfig.jwt.accessToken.secret,
      expiresIn: AuthConfig.jwt.accessToken.expired,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: AuthConfig.jwt.refreshToken.secret,
      expiresIn: AuthConfig.jwt.refreshToken.expired,
    });
    const keyAccessToken = this.getCacheKey(userId, CacheKey.AccessToken);
    this.cacheService.set(keyAccessToken, accessToken);

    const keyRefreshToken = this.getCacheKey(userId, CacheKey.RefreshToken);
    this.cacheService.set(keyRefreshToken, refreshToken);

    return { accessToken, refreshToken };
  }

  private getCacheKey(name: string, identity: string) {
    return Buffer.from(`${name}_${identity}`, 'utf-8').toString('base64url');
  }
  // end helper region
}
