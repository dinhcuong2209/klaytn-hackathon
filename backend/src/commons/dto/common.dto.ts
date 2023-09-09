import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginationQuery {
  @ApiProperty({ required: false, example: 1, type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @ApiProperty({ required: false, example: 20, type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pageSize?: number;

  @ApiProperty({ required: false, description: 'Enter the field to orderBy' })
  @IsString()
  @IsOptional()
  order?: string;

  @ApiProperty({
    required: false,
    description: `Enter 'desc'or 'asc'`,
  })
  @IsString()
  @IsOptional()
  orderBy?: string;

  @ApiProperty({ required: false, description: 'Enter the field to search' })
  @IsString()
  @IsOptional()
  keyword?: string;
}
