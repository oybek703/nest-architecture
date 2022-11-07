import { ConfigService } from '@nestjs/config'
import { TypegooseModuleOptions } from 'nestjs-typegoose'

export const getMongoConfig = async (
  configService: ConfigService
): Promise<TypegooseModuleOptions> => ({
  uri: getMongoString(configService)
})

const getMongoString = (configService: ConfigService) =>
  `mongodb://${configService.get('DB_USERNAME')}:${configService.get(
    'DB_PASSWORD'
  )}@${configService.get('DB_HOST')}:${configService.get('DB_PORT')}/${configService.get(
    'DB_NAME'
  )}`
