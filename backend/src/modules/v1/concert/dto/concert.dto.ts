import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateConcertDto {
  @ApiProperty({ required: true, example: 'ChiPu World Tour' })
  @IsString()
  name: string;

  @ApiProperty({ required: true, example: 'CWT' })
  @IsString()
  symbol: string;

  @ApiProperty({ required: true, example: 'China' })
  @IsString()
  location: string;

  @ApiProperty({
    required: true,
    example:
      'https://vcdn-vnexpress.vnecdn.net/2022/02/09/chi-pu-3343-1627638260-2738-1644378305.jpg',
  })
  @IsString()
  img: string;

  @ApiProperty({ required: false, example: 'The bét singer in VietNam' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: true, example: 50 })
  @IsNumber()
  price: number;

  @ApiProperty({ required: true, example: '2023-10-10 10:00:00' })
  @IsISO8601()
  startTime: Date;

  @ApiProperty({ required: true, example: 2000 })
  @IsString()
  qty: string;
}

export class UpdateConcertDto extends CreateConcertDto {}
