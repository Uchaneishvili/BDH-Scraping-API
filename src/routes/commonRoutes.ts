import { Application, Request, Response } from 'express'
import path from 'path'

export class CommonRoutes {
  public route(app: Application, rootDir: string): void {
    app.get('/status', function (_: Request, res: Response) {
      res.sendStatus(200)
    })

    // Mismatch URL
    app.all('*', function (req: Request, res: Response) {
      res.sendFile(path.join(rootDir, 'public/index.html'))
    })
  }
}
