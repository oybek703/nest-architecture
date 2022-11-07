import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { CreateReviewDto } from '../src/review/dto/create-review.dto'
import { Types, disconnect } from 'mongoose'
import { AppModule } from '../src/app.module'
import { REVIEW_NOT_FOUND } from '../src/review/review.constants'

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
  let createdReviewId: string

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/review/create (POST) - success', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/review/create')
      .send(createDto)
      .expect(201)
    createdReviewId = body._id
    expect(body._id).toBeDefined()
  })

  it('/review/create (POST) - failure', async () => {
    await request(app.getHttpServer())
      .post('/review/create')
      .send({ ...createDto, rating: 0 })
      .expect(400)
  })

  it('/review/byProduct/:productId (GET) - success', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/review/byProduct/${productId}`)
      .expect(200)
    expect(body.length).toBe(1)
  })

  it('/review/byProduct/:productId (GET) - failure', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/review/byProduct/${new Types.ObjectId().toHexString()}`)
      .expect(200)
    expect(body.length).toBe(0)
  })

  it('/review/:reviewId (DELETE) - success', async () => {
    const { body } = await request(app.getHttpServer())
      .delete(`/review/${createdReviewId}`)
      .expect(200)
  })

  it('/review/:reviewId (DELETE) - failure', async () => {
    await request(app.getHttpServer())
      .delete(`/review/${new Types.ObjectId().toHexString()}`)
      .expect(404, {
        statusCode: 404,
        message: REVIEW_NOT_FOUND
      })
  })

  afterAll(() => {
    disconnect()
  })
})
