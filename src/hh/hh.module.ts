import { Module } from '@nestjs/common'
import { HhService } from './hh.service'
import { HttpModule } from '@nestjs/axios'

@Module({
  providers: [HhService],
  imports: [HttpModule],
  exports: [HhService]
})
export class HhModule {}
