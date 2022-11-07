import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { AuthModel } from './auth.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { AuthDto } from './dto/auth.dto'
import { genSalt, hash } from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(@InjectModel(AuthModel) private readonly authModel: ModelType<AuthModel>) {}

  async createUser(dto: AuthDto) {
    const salt = await genSalt(5)
    const hashedPassword = await hash(dto.password, salt)
    return (await this.authModel.create({ email: dto.email, password: hashedPassword })).save()
  }

  async findUser(email: string) {
    return this.authModel.findOne({ email })
  }
}
