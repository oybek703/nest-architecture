import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { UserModel } from './user.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { AuthDto } from './dto/auth.dto'
import { compare, genSalt, hash } from 'bcryptjs'
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD } from './auth.constants'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly authModel: ModelType<UserModel>,
    private readonly jwtService: JwtService
  ) {}

  async createUser(dto: AuthDto) {
    const salt = await genSalt(5)
    const hashedPassword = await hash(dto.password, salt)
    const newUser = await this.authModel.create({ email: dto.email, password: hashedPassword })
    const savesUser = await newUser.save()
    savesUser.password = undefined
    return savesUser
  }

  async findUser(email: string) {
    return await this.authModel.findOne({ email }).exec()
  }

  async validateUser(email: string, password: string) {
    const user = await this.findUser(email)
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR)
    }
    const matchPassword = await compare(password, user.password)
    if (!matchPassword) {
      throw new BadRequestException(WRONG_PASSWORD)
    }
    return { email: user.email }
  }

  async login(email: string) {
    return {
      access_token: await this.jwtService.signAsync({ email })
    }
  }
}
