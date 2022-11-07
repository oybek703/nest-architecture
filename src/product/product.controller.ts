import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common'
import { ProductModel } from './product.model'
import { FindProductDto } from './dto/find-product.dto'

@Controller('product')
export class ProductController {
  @Post('create')
  create(@Body() dto: Omit<ProductModel, '_id'>) {}

  @Get(':id')
  get(@Param('id') id: string) {}

  @Delete(':id')
  delete(@Param('id') id: string) {}

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: ProductModel) {}

  @HttpCode(2000)
  @Post('find')
  find(@Body() dto: FindProductDto) {}
}
