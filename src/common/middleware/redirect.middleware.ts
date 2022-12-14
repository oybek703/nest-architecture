import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class RedirectMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    if (!req.originalUrl.includes('/api/') && !req.originalUrl.startsWith('/static')) {
      res.redirect('/api/docs')
    }
    next()
  }
}
