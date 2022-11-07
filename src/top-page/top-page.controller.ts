import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common'
import { TopPageModel } from './top-page.model'
import { FindTopPageDto } from './dto/find-top-page.dto'

@Controller('top-page')
export class TopPageController {
  @Post('create')
  create(@Body() dto: Omit<TopPageModel, '_id'>) {}

  @Get(':id')
  get(@Param('id') id: string) {}

  @Delete(':id')
  delete(@Param('id') id: string) {}

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: TopPageModel) {}

  @HttpCode(2000)
  @Post('find')
  find(@Body() dto: FindTopPageDto) {}
}
