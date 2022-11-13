import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { CreateReviewDto } from './dto/create-review.dto'
import { ReviewService } from './review.service'
import { REVIEW_NOT_FOUND } from './review.constants'
import { JwtGuard } from '../auth/guards/jwt.guard'
import { UserEmail } from '../decorators/user-email.decorator'
import { IdValidationPipe } from '../pipes/id-validation.pipe'

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtGuard)
  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return await this.reviewService.create(dto)
  }

  @Delete(':reviewId')
  async delete(@Param('reviewId', IdValidationPipe) reviewId: string) {
    const deletedReview = await this.reviewService.delete(reviewId)
    if (!deletedReview) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
    return deletedReview
  }

  @UseGuards(JwtGuard)
  @Get('byProduct/:productId')
  async get(@Param('productId', IdValidationPipe) productId: string, @UserEmail() email: string) {
    return await this.reviewService.findByProductId(productId)
  }

  @Delete('byProduct/:productId')
  async deleteByProductId(@Param('productId', IdValidationPipe) productId: string) {
    return await this.reviewService.deleteByProductId(productId)
  }
}
