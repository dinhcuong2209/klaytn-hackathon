import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'user1@gmail.com',
  })
  @IsString()
  @IsEmail()
  username: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'user12345@',
  })
  @IsString()
  password: string;
}

export class LoginDto extends RegisterDto {}
