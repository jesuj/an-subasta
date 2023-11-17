import { getDetailItems } from './detalleItem.js'
import { cleanText } from './utils.js'

const CATALOG_INDEX = [
  'lote',
  'administracion_aduanera',
  'clasificacion',
  'recinto',
  'direccion',
  'fecha_subasta',
  'dias_restantes'
]

export async function getCatalog($) {
  const $rows = $('table tbody tr')
  const catalogs = []

  $rows.each((_index, el) => {
    const $el = $(el)
    const id = $el.attr('id')
    const detail = {}
    $el.find('td').each((tdIndex, tdElement) => {
      const tdValue = $(tdElement).text()
      const cleanedValue = cleanText(tdValue)
      const index = CATALOG_INDEX[tdIndex]
      detail[index] = cleanedValue
    })
    if (detail.dias_restantes !== 'Cerrado') {
      catalogs.push({
        id,
        ...detail
      })
    }
  })
  const detailItems = await getDetailItems(catalogs)
  return detailItems
}
