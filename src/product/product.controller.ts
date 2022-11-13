import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { FindProductDto } from './dto/find-product.dto'
import { CreateProductDto } from './dto/create-product.dto'
import { ProductService } from './product.service'
import { PRODUCT_NOT_FOUND_ERROR } from './product.constants'
import { JwtGuard } from '../auth/guards/jwt.guard'
import { IdValidationPipe } from '../pipes/id-validation.pipe'

@Controller('product')
export class ProductController {
  private readonly productNotFoundException = new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
  constructor(private readonly productService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtGuard)
  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto)
  }

  @Get(':productId')
  async get(@Param('productId', IdValidationPipe) productId: string) {
    const product = this.productService.findById(productId)
    if (!productId) {
      throw this.productNotFoundException
    }
    return product
  }

  @Delete(':productId')
  async delete(@Param('productId', IdValidationPipe) productId: string) {
    const deletedProduct = await this.productService.delete(productId)
    if (!deletedProduct) {
      throw this.productNotFoundException
    }
    return deletedProduct
  }

  @Patch(':productId')
  async update(
    @Param('productId', IdValidationPipe) productId: string,
    @Body() dto: CreateProductDto
  ) {
    const updatedProduct = await this.productService.update(productId, dto)
    if (!updatedProduct) {
      throw this.productNotFoundException
    }
    return updatedProduct
  }

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtGuard)
  @Post('find')
  async find(@Body() dto: FindProductDto) {
    return this.productService.findWithReviews(dto)
  }
}
