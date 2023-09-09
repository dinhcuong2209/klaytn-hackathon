import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class BuyTicketDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Concert smart contract address',
  })
  @IsString()
  concertAdd: string;

  @ApiProperty({ type: String, required: true, description: 'Concert Id' })
  @IsString()
  @IsMongoId()
  concert: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '0x1e0E43aE11BF47aC033DA5fA948aa9f7d35c49a0',
  })
  @IsString()
  walletAdd: string;
}
