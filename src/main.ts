import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const PORT = process.env.PORT
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('YO-TOP API')
    .setDescription('Yo top api docs')
    .setVersion('1.1.0')
    .addTag('YO-top-services')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)
  await app.listen(PORT)
}
;(async () => bootstrap())()
