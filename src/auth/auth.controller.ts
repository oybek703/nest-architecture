import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { AuthDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
  @HttpCode(200)
  @Post('login')
  login(@Body() dto: AuthDto) {}

  @Post('register')
  register(@Body() dto: AuthDto) {}
}
