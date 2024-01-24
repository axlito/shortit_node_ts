import { validateUrl } from "../schemas/url.schema"
import { UrlInterface } from "../types"
import { prisma } from "../utils/database"
import { Request, Response } from 'express'

export const getAllUrls = async (req: Request, res: Response) => {

  let urls: UrlInterface[] = []
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
    return res.status(404).json({ error: result.error.message })
  }

  const url = await prisma.url.create({
    data: {
      base_url: newUrl.base_url,
      short_url: newUrl.short_url
    }
  })

  return res.status(200).json(url)

}

export const getUrlById = async (req: Request, res: Response) => {

  let urls: UrlInterface | null
  const { id } = req.params

  urls = await prisma.url.findUnique({
    where: { id: id }
  })

  if (urls !== null) {
    return res.status(200).json(urls)
  }

  return res.status(404).json({ message: 'URL not found' })

}

export const deleteUrl = async (req: Request, res: Response) => {

  const { id } = req.params

  const result = await prisma.url.delete({
    where: { id: id }
  })

  if (result) {
    return res.status(200).json({ message: 'URL deleted!!' })
  }

  return res.status(404).json({ message: 'URL not found' })

}
