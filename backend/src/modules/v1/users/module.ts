import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/commons/logging/logger.module';
import { UsersController } from './controller';
import { UsersService } from './service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    LoggerModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
