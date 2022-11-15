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
import { TopPageModel } from './top-page.model'
import { FindTopPageDto } from './dto/find-top-page.dto'
import { CreateTopPageDto } from './dto/create-top-page.dto'
import { TopPageService } from './top-page.service'
import { IdValidationPipe } from '../pipes/id-validation.pipe'
import { NOT_FOUND_TOP_PAGE_ERROR } from './top-page.constants'
import { JwtGuard } from '../auth/guards/jwt.guard'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Top-page')
@Controller('top-page')
export class TopPageController {
  private readonly notFoundException = new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR)
  constructor(private readonly topPageService: TopPageService) {}

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtGuard)
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
  async getByAlias(@Param('alias') alias: string) {
    const topPage = this.topPageService.findByAlias(alias)
    if (!topPage) {
      throw this.notFoundException
    }
    return topPage
  }

  @Delete(':topPageId')
  @UseGuards(JwtGuard)
  delete(@Param('topPageId', IdValidationPipe) topPageId: string) {
    const deletedTopPage = this.topPageService.delete(topPageId)
    if (!deletedTopPage) {
      throw this.notFoundException
    }
    return deletedTopPage
  }

  @Patch(':topPageId')
  @UseGuards(JwtGuard)
  async update(@Param('topPageId', IdValidationPipe) topPageId: string, @Body() dto: TopPageModel) {
    const updatedTopPage = await this.topPageService.update(topPageId, dto)
    if (!updatedTopPage) {
      throw this.notFoundException
    }
    return updatedTopPage
  }

  @HttpCode(200)
  @Post('find')
  find(@Body() dto: FindTopPageDto) {
    return this.topPageService.findByCategory(dto.firstCategory)
  }
}
