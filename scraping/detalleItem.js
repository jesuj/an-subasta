import { URLSearchParams } from 'node:url'
import { logInfo, logSuccess } from './log.js'

import { cleanUrlImg, saveImage, scrape } from './utils.js'

const detailApiEnpoint = 'http://anbsw04.aduana.gob.bo:7551/subastas/page/TileDetalleItem.jsp'
const URL_BASE_AN = 'http://anbsw04.aduana.gob.bo:7551/subastas/'

const headers = {
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
  'accept-language': 'es-BO,es-419;q=0.9,es;q=0.8',
  'cache-control': 'max-age=0',
  'content-type': 'application/x-www-form-urlencoded'
}

export async function getDetailItems (catalog) {
  const detailItems = await Promise.all(
    catalog.map(async (catalogInfo) => {
      const { lote: loteNumber, fecha_subasta: fechaSubasta, clasificacion, administracion_aduanera: administracionAduanera } = catalogInfo
      const year = fechaSubasta?.split('/')?.at(-1) ?? '2023'
      const number = 1
      const flag = 0

      logInfo(`> Fetching attachment for catalogo: ${loteNumber} - ${clasificacion} - ${administracionAduanera}`)
      const body = new URLSearchParams()
      body.append('l_numero', loteNumber)
      body.append('anio', year)
      body.append('numero', number)
      body.append('flag', flag)
      const $ = await scrape(detailApiEnpoint, {
        method: 'POST',
        headers,
        body
      })
      const $rows = $('table tbody tr')

      const detailItems = []
      $rows.each((index, el) => {
        const $el = $(el)
        const $a = $el.find('td a')
        const imgSrc = $a.attr('href')
        const $tdDetails = $a.parent().next('td')
        const formatUrlImg = cleanUrlImg(imgSrc, loteNumber)
        if (formatUrlImg !== null) {
          const img = formatUrlImg !== null ? URL_BASE_AN + formatUrlImg : ''
          const details = {}
          $tdDetails.find('b').each((_i, bElement) => {
            const $bElement = $(bElement)
            const key = $bElement.text().trim()
            const value = $bElement.next().text().trim()
            details[key] = value
          })
          detailItems.push({ nro: index, img, details })
        }
      })
      const detailItemsStaticImg = await Promise.all(
        detailItems.map(async data => {
          let imgStatic = ''
          if (data.img !== '') {
            const nameImgExtension = data.img.split('/').at(-1)
            const fileName = nameImgExtension.split('.').at(0)
            imgStatic = await saveImage({ folder: 'items', fileName, url: data.img })
          }
          return { imgStatic, ...data }
        })
      )
      return { ...catalogInfo, detailItems: detailItemsStaticImg }
    })
  )
  logSuccess('> All items are done!')
  return detailItems
}
