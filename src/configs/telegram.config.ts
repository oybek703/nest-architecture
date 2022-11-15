import { ConfigService } from '@nestjs/config'
import { TypegooseModuleOptions } from 'nestjs-typegoose'
import { ITelegramOptions } from '../telegram/telegram.interface'

export const getTelegramConfig = (): ITelegramOptions => ({
  chatId: '',
  token: ''
})
