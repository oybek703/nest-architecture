import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { AuthModel } from './auth.model'
import { AuthService } from './auth.service'

@Module({
  controllers: [AuthController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: AuthModel,
        schemaOptions: {
          collection: 'Auth'
        }
      }
    ])
  ],
  providers: [AuthService]
})
export class AuthModule {}
