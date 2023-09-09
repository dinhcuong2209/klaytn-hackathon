import { Module } from '@nestjs/common';
import { AuthService } from './service';
import { AuthController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/model';
import { RedisCacheModule } from '../cache/module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RedisCacheModule,
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
