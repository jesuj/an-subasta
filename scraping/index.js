import { logInfo } from './log.js'
import { SCRAPINGS } from './scrapings.js'
import { scrapeAndSave } from './utils.js'

// get first parameter from command line
const scrapeParameter = process.argv.at(-1)

if (SCRAPINGS[scrapeParameter]) {
  await scrapeAndSave(scrapeParameter)
} else {
  logInfo('Scraping all data...')

  for (const infoToScrape of Object.keys(SCRAPINGS)) {
    await scrapeAndSave(infoToScrape)
  }
}
