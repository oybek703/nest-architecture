import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { CreateReviewDto } from '../src/review/dto/create-review.dto'
import { Types, disconnect } from 'mongoose'
import { AppModule } from '../src/app.module'
import { REVIEW_NOT_FOUND } from '../src/review/review.constants'
import { AuthDto } from '../src/auth/dto/auth.dto'
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD } from '../src/auth/auth.constants'

const loginDto: AuthDto = {
  email: 'test@gmail.com',
  password: '123'
}

describe('Auth login (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/auth/login (POST) - success', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200)
    expect(body.access_token).toBeDefined()
  })

  it('/auth/login (POST) - failure[email]', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, email: 'test1@gmail.com' })
      .expect(404)
    expect(body.message).toBe(USER_NOT_FOUND_ERROR)
  })

  it('/auth/login (POST) - failure[password]', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, password: '12' })
      .expect(401)
    expect(body.message).toBe(WRONG_PASSWORD)
  })

  afterAll(() => {
    disconnect()
  })
})
