import { validateUrl } from "../schemas/url.schema"
import { UrlInterface } from "../types"
import { prisma } from "../utils/database"
import { Request, Response } from 'express'

export const getAllUrls = async (req: Request, res: Response) => {

  let urls: UrlInterface[]
  const search = req.body.search

  if (search) {
    urls = await prisma.url.findMany({
      where: { base_url: { contains: search } }
    })
  } else {
    urls = await prisma.url.findMany()
  }

  return res.status(200).json(urls)

}

export const createUrl = async (req: Request, res: Response) => {

  const newUrl: UrlInterface = {
    base_url: req.body.base_url,
    short_url: req.body.short_url
  }

  const result = validateUrl(newUrl)

  if (result.error) {
    return res.status(500).json({ error: result.error.message })
  }

  const url = await prisma.url.create({
    data: {
      base_url: newUrl.base_url,
      short_url: newUrl.short_url
    }
  })

  return res.status(200).json(url)

}
