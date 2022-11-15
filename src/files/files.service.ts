import { BadRequestException, Injectable } from '@nestjs/common'
import { FileElementResponse } from './dto/file-element.response'
import { format } from 'date-fns'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import * as sharp from 'sharp'
import { MFile } from './mFile.class'

@Injectable()
export class FilesService {
  async saveFiles(files: MFile[]): Promise<FileElementResponse[]> {
    if (!files.length) throw new BadRequestException('files is not provided!')
    const dateFolder = format(new Date(), 'yyyy-mm-dd')
    const uploadDir = `${path}/uploads/${dateFolder}`
    await ensureDir(uploadDir)
    const res: FileElementResponse[] = []
    for (const file of files) {
      await writeFile(`${uploadDir}/${file.originalname}`, file.buffer)
      res.push({ name: file.originalname, url: `${dateFolder}/${file.originalname}` })
    }
    return res
  }

  async convertToWebP(file: Buffer): Promise<Buffer> {
    return await sharp(file).webp().toBuffer()
  }
}
