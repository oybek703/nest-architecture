import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post
} from '@nestjs/common'
import { ProductModel } from './product.model'
import { FindProductDto } from './dto/find-product.dto'
import { CreateProductDto } from './dto/create-product.dto'
import { ProductService } from './product.service'
import { PRODUCT_NOT_FOUND_ERROR } from './product.constants'

@Controller('product')
export class ProductController {
  private readonly productNotFoundException = new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto)
  }

  @Get(':productId')
  async get(@Param('productId') productId: string) {
    const product = this.productService.findById(productId)
    if (!productId) {
      throw this.productNotFoundException
    }
    return product
  }

  @Delete(':productId')
  async delete(@Param('productId') productId: string) {
    const deletedProduct = await this.productService.delete(productId)
    if (!deletedProduct) {
      throw this.productNotFoundException
    }
    return deletedProduct
  }

  @Patch(':productId')
  async update(@Param('productId') productId: string, @Body() dto: CreateProductDto) {
    const updatedProduct = await this.productService.update(productId, dto)
    if (!updatedProduct) {
      throw this.productNotFoundException
    }
    return updatedProduct
  }

  @HttpCode(2000)
  @Post('find')
  find(@Body() dto: FindProductDto) {}
}
