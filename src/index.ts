import express from 'express'
import dotenv from 'dotenv'
import { corsMiddleware } from './middlewares/cors.middleware'


export const createApp = () => {
  const app = express()
  app.use(express.json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')
  dotenv.config()

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`server listen on http://localhost:${PORT}`)
  })
}

createApp()
