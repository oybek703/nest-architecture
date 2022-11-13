import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

class ProductCharacteristicsDto {
  @IsString()
  name: string

  @IsString()
  value: string
}

export class CreateProductDto {
  @IsString()
  image: string

  @IsString()
  title: string

  @IsNumber()
  price: number

  @IsString()
  @IsOptional()
  oldPrice?: number

  @IsNumber()
  credit: number

  @IsNumber()
  calculateRating: number

  @IsString()
  description: string

  @IsString()
  advantages: string

  @IsString()
  disAdvantages: string

  @IsString({ each: true })
  categories: string[]

  @IsString({ each: true })
  tags: string[]

  @IsArray()
  @ValidateNested()
  @Type(() => ProductCharacteristicsDto)
  characteristics: ProductCharacteristicsDto[]
}
