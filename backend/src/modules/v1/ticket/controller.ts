import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { PaginationQuery } from 'src/commons/dto/common.dto';
import { BuyTicketDto } from './dto/ticket.dto';
import { TicketService } from './service';

@ApiTags('Ticket')
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  create(@Body() ticket: BuyTicketDto) {
    return this.ticketService.create(ticket);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Enter your wallet address in to the params',
    example: '0x1e0E43aE11BF47aC033DA5fA948aa9f7d35c49a0',
  })
  @Get('my-addr/:id')
  findAll(@Query() query: PaginationQuery, @Param('id') id: string) {
    return this.ticketService.findAll(query, id);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Enter the ticket address in to the params',
    example: '64fc1126caf5ae5dc3434b80',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(id);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() payload: UpdateConcertDto) {
  //   return this.ticketService.update(id, payload);
  // }

  // @Delete(':id')
  // inactiveConcert(@Param('id') id: string) {
  //   return this.ticketService.inactiveConcert(id);
  // }
}
