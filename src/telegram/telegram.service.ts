import { Inject, Injectable } from '@nestjs/common'
import { Telegraf } from 'telegraf'
import { ITelegramOptions } from './telegram.interface'
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants'
import { format } from 'date-fns'

@Injectable()
export class TelegramService {
  bot: Telegraf
  options: ITelegramOptions

  constructor(@Inject(TELEGRAM_MODULE_OPTIONS) options: ITelegramOptions) {
    this.bot = new Telegraf(options.token)
    this.options = options
  }

  async sendMessage(message: string, chatId: string = this.options.chatId) {
    message += `\nTime: ${format(new Date(), 'dd.MM.yyyy hh:mm:ss aaa')}`
    await this.bot.telegram.sendMessage(chatId, message)
  }
}
