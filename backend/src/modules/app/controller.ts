import { Controller, Get } from '@nestjs/common';
import { AppService } from './service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('status')
  getStatus() {
    return 'up';
  }
}
