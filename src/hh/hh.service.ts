import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpService } from '@nestjs/axios'
import { API_URL, CLUSTER_NOT_FOUND_ERROR, SALARY_CLUSTER_ID } from './hh.constants'
import { lastValueFrom } from 'rxjs'
import { HhResponse } from './hh.models'
import { HhData } from '../top-page/top-page.model'

@Injectable()
export class HhService {
  private readonly token: string

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    this.token = this.configService.get('HH_TOKEN') || ''
  }

  async getData(text: string): Promise<HhData> {
    const tempData = { count: 10, seniorSalary: 110000, middleSalary: 70000, juniorSalary: 40000 }
    try {
      // const res = await this.httpService.get(API_URL.vacancies, {
      //   params: { text, clusters: true },
      //   headers: {
      //     'User-Agent': 'YoTop/1.0 (test@gmail.com)',
      //     Authorization: `Bearer ${this.token}`
      //   }
      // })
      // const { data } = await lastValueFrom(res)
      // return this.parseData(data)
      return tempData
    } catch (e) {
      Logger.error(e)
      return tempData
    }
  }

  private parseData(data: HhResponse): HhData {
    const salaryCluster = data.clusters.find((c) => c.id === SALARY_CLUSTER_ID)
    if (!salaryCluster) {
      throw new Error(CLUSTER_NOT_FOUND_ERROR)
    }
    const juniorSalary = HhService.getSalaryFromString(salaryCluster.items[1].name)
    const middleSalary = HhService.getSalaryFromString(
      salaryCluster.items[Math.ceil(salaryCluster.items.length / 2)].name
    )
    const seniorSalary = HhService.getSalaryFromString(
      salaryCluster.items[salaryCluster.items.length - 1].name
    )
    return {
      count: data.found,
      juniorSalary,
      middleSalary,
      seniorSalary
    }
  }

  private static getSalaryFromString(s: string): number {
    const res = s.match(/(\d+)/g)
    if (!res) {
      return 0
    }
    return Number(res[0])
  }
}
