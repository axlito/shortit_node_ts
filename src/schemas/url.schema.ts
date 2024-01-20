import z from 'zod'
// import { UrlInterface } from '../types'

const UrlSchema = z.object({
  base_url: z
    .string({ required_error: 'base url is required' })
    .url({ message: 'must be a valid url' }),
  short_url: z
    .string({ required_error: 'shortened url is required' })
})

export function validateUrl(object: any): any {
  return UrlSchema.safeParse(object)
}
