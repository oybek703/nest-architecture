import {
  BadRequestException,
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { JwtGuard } from '../auth/guards/jwt.guard'
import { FileInterceptor } from '@nestjs/platform-express'
import { FileElementResponse } from './dto/file-element.response'
import { FilesService } from './files.service'

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @HttpCode(200)
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('files'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponse[]> {
    if (!file) throw new BadRequestException('files field should not be empty!')
    return this.filesService.saveFiles([file])
  }
}
