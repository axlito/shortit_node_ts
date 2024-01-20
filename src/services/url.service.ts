import { validateUrl } from "../schemas/url.schema"
import { UrlInterface } from "../types"
import { prisma } from "../utils/database"

export const getAllUrls = async (search: string): Promise<UrlInterface[]> => {

  let urls: UrlInterface[]

  if (search) {
    urls = await prisma.url.findMany({
      where: { base_url: { contains: search } }
    })
  } else {
    urls = await prisma.url.findMany()
  }

  return urls

}

export const createUrl = async (newUrl: UrlInterface) => {

  const result = validateUrl(newUrl)

  if (result.error) {
    return result.error.message
  }

  const url = await prisma.url.create({
    data: {
      base_url: newUrl.base_url,
      short_url: newUrl.short_url
    }
  })

  return url

}
