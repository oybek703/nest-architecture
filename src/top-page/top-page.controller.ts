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
import { TopPageModel } from './top-page.model'
import { FindTopPageDto } from './dto/find-top-page.dto'
import { CreateTopPageDto } from './dto/create-top-page.dto'
import { TopPageService } from './top-page.service'
import { IdValidationPipe } from '../pipes/id-validation.pipe'
import { NOT_FOUND_TOP_PAGE_ERROR } from './top-page.constants'

@Controller('top-page')
export class TopPageController {
  private readonly notFoundException = new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR)
  constructor(private readonly topPageService: TopPageService) {}

  @Post('create')
  async create(@Body() dto: CreateTopPageDto) {
    return this.topPageService.create(dto)
  }

  @Get(':topPageId')
  async get(@Param('topPageId', IdValidationPipe) topPageId: string) {
    const topPage = this.topPageService.findById(topPageId)
    if (!topPage) {
      throw this.notFoundException
    }
    return topPage
  }

  @Get('byAlias/:alias')
  async getByAlias(@Param('alias', IdValidationPipe) alias: string) {
    const topPage = this.topPageService.findByAlias(alias)
    if (!topPage) {
      throw this.notFoundException
    }
    return topPage
  }

  @Get('byCategory/:category')
  async getByCategory(@Param('category', IdValidationPipe) category: string) {
    const topPages = this.topPageService.findByCategory(category)
    if (!topPages) {
      throw this.notFoundException
    }
    return topPages
  }

  @Delete(':topPageId')
  delete(@Param('topPageId', IdValidationPipe) topPageId: string) {
    const deletedTopPage = this.topPageService.delete(topPageId)
    if (!deletedTopPage) {
      throw this.notFoundException
    }
    return deletedTopPage
  }

  @Patch(':topPageId')
  async update(@Param('topPageId', IdValidationPipe) topPageId: string, @Body() dto: TopPageModel) {
    const updatedTopPage = await this.topPageService.update(topPageId, dto)
    if (!updatedTopPage) {
      throw this.notFoundException
    }
    return updatedTopPage
  }

  @HttpCode(2000)
  @Post('find')
  find(@Body() dto: FindTopPageDto) {}
}
