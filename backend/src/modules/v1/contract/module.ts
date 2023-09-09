import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/commons/logging/logger.module';
import { ContractController } from './controller';
import { ContractService } from './service';

@Module({
  imports: [LoggerModule],
  controllers: [ContractController],
  providers: [ContractService],
  exports: [ContractService],
})
export class ContractModule {}
