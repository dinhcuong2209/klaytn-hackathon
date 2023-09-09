import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConcertService } from './service';
import { CreateConcertDto, UpdateConcertDto } from './dto/concert.dto';
import { PaginationQuery } from 'src/commons/dto/common.dto';

@ApiTags('Concert')
@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Post()
  create(@Body() concertInfo: CreateConcertDto) {
    return this.concertService.create(concertInfo);
  }

  @Get()
  findAll(@Query() query: PaginationQuery) {
    return this.concertService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.concertService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateConcertDto) {
    return this.concertService.update(id, payload);
  }

  @Delete(':id')
  inactiveConcert(@Param('id') id: string) {
    return this.concertService.inactiveConcert(id);
  }
}
