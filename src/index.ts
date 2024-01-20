import express from 'express'
import dotenv from 'dotenv'
import { corsMiddleware } from './middlewares/cors.middleware'
import { urlRouter } from './routes/url.routes'


const app = express()

app.use(express.json())
app.use(corsMiddleware())

dotenv.config()
app.disable('x-powered-by')

app.use('/urls', urlRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listen on http://localhost:${PORT}`)
})
