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
import { MFile } from './mFile.class'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @Post('upload')
  @HttpCode(200)
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('files'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponse[]> {
    if (!file) throw new BadRequestException('files field should not be empty!')
    const saveArray: MFile[] = [new MFile(file)]
    if (file.mimetype.includes('image')) {
      const buffer = await this.filesService.convertToWebP(file.buffer)
      saveArray.push({ buffer, originalname: `${file.originalname.split('.')[0]}.webp` })
    }
    return this.filesService.saveFiles(saveArray)
  }
}
