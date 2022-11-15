import { IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class FindProductDto {
  @ApiProperty()
  @IsString()
  category: string

  @ApiProperty()
  @IsNumber()
  limit: number
}
