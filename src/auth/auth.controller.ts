import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { AuthDto } from './dto/auth.dto'
import { AuthService } from './auth.service'
import { ALREADY_REGISTERED_ERROR } from './auth.constants'
import { ApiTags } from '@nestjs/swagger'
import { TelegramService } from '../telegram/telegram.service'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly telegramService: TelegramService
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AuthDto) {
    await this.telegramService.sendMessage(`Register => \n ${JSON.stringify(dto)}`)
    return this.authService.createUser(dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {
    const { email } = await this.authService.validateUser(dto.email, dto.password)
    return this.authService.login(email)
  }
}
