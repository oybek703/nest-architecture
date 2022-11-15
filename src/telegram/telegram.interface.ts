import { ModuleMetadata } from '@nestjs/common'

export class ITelegramOptions {
  chatId: string
  token: string
}

export interface ITelegramModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<ITelegramOptions> | ITelegramOptions
  inject?: any
}
