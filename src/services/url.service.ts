import { validateUrl } from "../schemas/url.schema"
import { UrlInterface } from "../types"
import { prisma } from "../utils/database"
import { Request, Response } from 'express'

export const getAllUrls = async (req: Request, res: Response) => {
  const search = <string>req.query.search
  let result: UrlInterface[] = []
  if (!search) {
    result = await prisma.url.findMany()
  } else {
    result = await prisma.url.findMany({
      where: { base_url: { contains: search } }
    })
  }
  return res.status(200).json(result)
}

export const createUrl = async (req: Request, res: Response) => {
  const newUrl: UrlInterface = {
    base_url: req.body.base_url,
    short_url: req.body.short_url
  }
  const validation = validateUrl(newUrl)
  if (validation.error) return res.status(404).json({ message: validation.error.message })
  try {
    const result = await prisma.url.create({
      data: newUrl
    })
    return res.status(200).json(result)
  } catch (error) {
    return res.status(404).json({ error })
  }
}

export const getUrlById = async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await prisma.url.findUnique({
    where: { id: id }
  })
  if (result !== null) return res.status(200).json(result)
  return res.status(404).json({ error: 'url not found' })
}

export const deleteUrl = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await prisma.url.delete({
      where: { id: id }
    })
    return res.status(200).json({ message: 'url deleted' })
  } catch (error) {
    return res.status(404).json({ error })
  }
}
