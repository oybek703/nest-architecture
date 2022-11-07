import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { CreateReviewDto } from '../src/review/dto/create-review.dto'
import { Types, disconnect } from 'mongoose'
import { AppModule } from '../src/app.module'

const productId = new Types.ObjectId().toHexString()

const createDto: CreateReviewDto = {
  name: 'Test',
  description: 'Test desc',
  rating: 4,
  title: 'Test title',
  productId
}

describe('Create and delete review (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('should create new review', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/review/create')
      .send(createDto)
      .expect(201)
    expect(body._id).toBeDefined()
  })

  afterAll(() => {
    disconnect()
  })
})
