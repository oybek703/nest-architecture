import { prop } from '@typegoose/typegoose'

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products
}

export class HhData {
  @prop()
  count: number

  @prop()
  juniorSalary: number

  @prop()
  middleSalary: number

  @prop()
  seniorSalary: number
}

export class TopPageAdvantage {
  title: string
  description: string
}

export class TopPageModel {
  @prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory

  @prop()
  secondCategory: string

  @prop({ unique: true })
  alias: string

  @prop()
  title: string

  @prop()
  category: string

  @prop({ type: () => HhData, _id: false })
  hh?: HhData

  @prop({ type: () => [TopPageAdvantage], _id: false })
  advantages: TopPageAdvantage[]

  @prop()
  seoText: string

  @prop()
  tagsTitle: string

  @prop({ type: () => [String] })
  tags: string[]
}
