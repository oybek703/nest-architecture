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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { TelegramService } from '../telegram/telegram.service'

@ApiTags('Reviews')
@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly telegramService: TelegramService
  ) {}

  @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtGuard)
  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return await this.reviewService.create(dto)
  }

  @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtGuard)
  @Post('notify')
  async notify(@Body() dto: CreateReviewDto) {
    const message = `Name: ${dto.name}\nTitle: ${dto.title}\nDesc: ${dto.description}\nRating: ${dto.rating}\nProduct id: ${dto.productId}`
    return await this.telegramService.sendMessage(message)
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete(':reviewId')
  async delete(@Param('reviewId', IdValidationPipe) reviewId: string) {
    const deletedReview = await this.reviewService.delete(reviewId)
    if (!deletedReview) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
    return deletedReview
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('byProduct/:productId')
  async get(@Param('productId', IdValidationPipe) productId: string, @UserEmail() email: string) {
    return await this.reviewService.findByProductId(productId)
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete('byProduct/:productId')
  async deleteByProductId(@Param('productId', IdValidationPipe) productId: string) {
    return await this.reviewService.deleteByProductId(productId)
  }
}
