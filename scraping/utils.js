import * as cheerio from 'cheerio'
import { logError, logInfo, logSuccess, logWarning } from './log.js'
import { writeDBFile } from '../db/index.js'
import sharp from 'sharp'
import path from 'node:path'
import { SCRAPINGS } from './scrapings.js'
const STATICS_PATH = path.join(process.cwd(), './assets/static/')

export const cleanText = (text) =>
  text
  // .replace(/\t|\n|\s:/g, '')
  // .replace(/.*:/g, ' ')
    .trim()

export const cleanUrlImg = (data, loteNumber) => {
  const regex = /'([^']+)'/
  const match = data.match(regex)

  if (match && match[1]) {
    const imageUrl = match[1]
    return imageUrl
  } else {
    // TODO: Revisar creo que el numero y flag es para la paginacion correr el detalle es donde sale
    logWarning(`No se encontró ninguna URL de imagen en la cadena ${data} - ${loteNumber}.`)
    return null
  }
}

export async function scrape (url, options = {}) {
  const res = await fetch(url, options)
  const html = await res.text()
  return cheerio.load(html)
}

export async function scrapeAndSave (name) {
  const start = performance.now()

  try {
    const { scraper, url, options } = SCRAPINGS[name]

    logInfo(`Scraping [${name}]...`)
    const $ = url ? await scrape(url, options) : null
    const content = await scraper($)
    logSuccess(`[${name}] scraped successfully`)

    logInfo(`Writing [${name}] to database...`)
    await writeDBFile(name, content)
    logSuccess(`[${name}] written successfully`)
  } catch (e) {
    logError(`Error scraping [${name}]`)
    logError(e)
  } finally {
    const end = performance.now()
    const time = (end - start) / 1000
    logInfo(`[${name}] scraped in ${time} seconds`)
  }
}

export const saveImage = async ({ url, folder, fileName }) => {
  logInfo(`Fetching image for file name: ${url}`)
  const responseImage = await fetch(url)
  const arrayBuffer = await responseImage.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  logInfo(`Writing image to disk ${fileName}`)
  const imageFileName = `${fileName}.webp`
  const imageFilePath = path.join(STATICS_PATH, folder, imageFileName)
  await sharp(buffer).webp().toFile(imageFilePath)

  logSuccess(`Everything is done! ${imageFileName}`)

  return imageFileName
}
