import { Router } from 'express'
import * as urlService from '../services/url.service'


export const urlRouter = Router()

urlRouter.get('/', urlService.getAllUrls)

urlRouter.post('/',urlService.createUrl)

// urlRouter.get('/:id', urlController.getById)
// urlRouter.delete('/:id', urlController.delete)
