import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ReviewModel } from './review.model'

@Controller('review')
export class ReviewController {
  @Post()
  create(@Body() dto: Omit<ReviewModel, '_id'>) {}

  @Delete(':id')
  delete(@Param('id') id: string) {}

  @Get('byProduct/:productId')
  get(@Param('productId') productId: string) {}
}
