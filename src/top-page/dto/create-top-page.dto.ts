import { TopLevelCategory } from '../top-page.model'
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

class HhDataDto {
  @ApiProperty()
  @IsNumber()
  count: number

  @ApiProperty()
  @IsNumber()
  juniorSalary: number

  @ApiProperty()
  @IsNumber()
  middleSalary: number

  @ApiProperty()
  @IsNumber()
  seniorSalary: number
}

class TopPageAdvantageDto {
  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty()
  @IsString()
  description: string
}

export class CreateTopPageDto {
  @ApiProperty({ enum: TopLevelCategory })
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory

  @ApiProperty()
  @IsString()
  secondCategory: string

  @ApiProperty()
  @IsString()
  alias: string

  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty()
  @IsString()
  category: string

  @ApiProperty({ required: false, type: () => [HhDataDto] })
  @IsOptional()
  @ValidateNested()
  @Type(() => HhDataDto)
  hh?: HhDataDto

  @ApiProperty({ type: () => [TopPageAdvantageDto] })
  @IsArray()
  @ValidateNested()
  @Type(() => TopPageAdvantageDto)
  advantages: TopPageAdvantageDto[]

  @ApiProperty()
  @IsString()
  seoText: string

  @ApiProperty()
  @IsString()
  tagsTitle: string

  @ApiProperty({ type: () => [String] })
  @IsString({ each: true })
  tags: string[]
}
