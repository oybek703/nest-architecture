import { IsNumber, IsString, Max, Min } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateReviewDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty()
  @IsString()
  description: string

  @ApiProperty({ minimum: 1, maximum: 5 })
  @Max(5)
  @Min(1)
  @IsNumber()
  rating: number

  @ApiProperty()
  @IsString()
  productId: string
}
