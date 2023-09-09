import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './model';
import { LoggerModule } from 'src/commons/logging/logger.module';
import { TicketController } from './controller';
import { TicketService } from './service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
    LoggerModule,
  ],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
