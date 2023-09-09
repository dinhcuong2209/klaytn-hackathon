import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MiddleWare } from 'src/middleware';
import { AuthModule } from '../v1/auth/module';
import { UsersModule } from '../v1/users/module';
import { AppConfig } from './config';
import { AppController } from './controller';
import { AppService } from './service';
import { ConcertModule } from '../v1/concert/module';
import { ContractModule } from '../v1/contract/module';
import { TicketModule } from '../v1/ticket/module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(AppConfig.MongoDB.uri, AppConfig.MongoDB.option),
    AuthModule,
    UsersModule,
    ConcertModule,
    ContractModule,
    TicketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddleWare).forRoutes('*');
  }
}
