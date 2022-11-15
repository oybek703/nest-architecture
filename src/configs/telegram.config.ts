import { ConfigService } from '@nestjs/config'
import { TypegooseModuleOptions } from 'nestjs-typegoose'
import { ITelegramOptions } from '../telegram/telegram.interface'

export const getTelegramConfig = (configService: ConfigService): ITelegramOptions => {
  const token = configService.get('TELEGRAM_BOT_TOKEN')
  if (!token) {
    throw new Error('Telegram bot token is not provided!')
  }
  const chatId = configService.get('TELEGRAM_CHAT_ID')
  return {
    chatId,
    token
  }
}
