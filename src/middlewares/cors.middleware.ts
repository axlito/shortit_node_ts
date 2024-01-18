import cors from 'cors'

const ACCEPTED_ORIGINS: string[] = [
  'http://localhost:8080',
  'http://localhost:3000',
  'http://localhost:4200'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    if (acceptedOrigins.includes(origin)) return callback(null, true)
    return callback(new Error('Not allowed by CORS'))
  }
})