import { Request, Response, Router } from 'express'
import * as urlService from '../services/url.service'
import { UrlInterface } from '../types'


export const urlRouter = Router()

urlRouter.get('/', (req: Request, res: Response) => {
  urlService.getAllUrls(req.body.search)
    .then((urls: UrlInterface[]) => {
      res.status(200).json(urls)
    })
})

urlRouter.post('/', (req: Request, res: Response) => {
  const newUrl: UrlInterface = {
    base_url: req.body.base_url,
    short_url: req.body.short_url
  }

  urlService.createUrl(newUrl)
    .then((url: UrlInterface) => {
      res.status(201).json(url)
    })
})

// urlRouter.get('/:id', urlController.getById)
// urlRouter.delete('/:id', urlController.delete)


