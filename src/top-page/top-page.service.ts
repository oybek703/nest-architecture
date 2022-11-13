import { Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { TopPageModel } from './top-page.model'
import { InjectModel } from 'nestjs-typegoose'
import { CreateTopPageDto } from './dto/create-top-page.dto'

@Injectable()
export class TopPageService {
  constructor(@InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>) {}

  async create(dto: CreateTopPageDto) {
    return this.topPageModel.create(dto)
  }

  async findById(id: string) {
    return this.topPageModel.findById(id).exec()
  }

  async findByAlias(alias: string) {
    return this.topPageModel.findOne({ alias }).exec()
  }

  async findByCategory(category: string) {
    return this.topPageModel.find({ category }, { alias: 1, secondCategory: 1, title: 1 }).exec()
  }

  update(topPageId: string, dto: CreateTopPageDto) {
    return this.topPageModel.findByIdAndUpdate(topPageId, dto, { new: true })
  }

  delete(topPageId: string) {
    return this.topPageModel.findByIdAndDelete(topPageId)
  }
}
