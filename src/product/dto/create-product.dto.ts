import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

class ProductCharacteristicsDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  value: string
}

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  image: string

  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty()
  @IsNumber()
  price: number

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  oldPrice?: number

  @ApiProperty()
  @IsNumber()
  credit: number

  @ApiProperty()
  @IsNumber()
  calculateRating: number

  @ApiProperty()
  @IsString()
  description: string

  @ApiProperty()
  @IsString()
  advantages: string

  @ApiProperty()
  @IsString()
  disAdvantages: string

  @ApiProperty({ type: () => [String] })
  @IsString({ each: true })
  categories: string[]

  @ApiProperty({ type: () => [String] })
  @IsString({ each: true })
  tags: string[]

  @ApiProperty({ type: () => [ProductCharacteristicsDto] })
  @IsArray()
  @ValidateNested()
  @Type(() => ProductCharacteristicsDto)
  characteristics: ProductCharacteristicsDto[]
}
