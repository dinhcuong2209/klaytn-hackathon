import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'src/commons/logging/logger.module';
import { ConcertController } from './controller';
import { Concert, ConcertSchema } from './model';
import { ConcertService } from './service';
import { ContractModule } from '../contract/module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Concert.name, schema: ConcertSchema }]),
    LoggerModule,
    ContractModule,
  ],
  controllers: [ConcertController],
  providers: [ConcertService],
})
export class ConcertModule {}
