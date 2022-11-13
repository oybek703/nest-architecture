import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ProductModel } from './product.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { CreateProductDto } from './dto/create-product.dto'

@Injectable()
export class ProductService {
  constructor(@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>) {}

  create(dto: CreateProductDto) {
    return this.productModel.create(dto)
  }

  findById(productId: string) {
    return this.productModel.findById(productId)
  }

  delete(productId: string) {
    return this.productModel.findByIdAndDelete(productId)
  }

  update(productId: string, dto: CreateProductDto) {
    return this.productModel.findByIdAndUpdate(productId, dto, { new: true })
  }
}
