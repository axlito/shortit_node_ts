import { Router } from 'express'
import * as urlService from '../services/url.service'


export const urlRouter = Router()

urlRouter.get('/', urlService.getAllUrls)

urlRouter.post('/',urlService.createUrl)

urlRouter.get('/:id', urlService.getUrlById)

urlRouter.delete('/:id', urlService.deleteUrl)
