import { getDetalleItems } from './detalleItem.js'
import { cleanText } from './utils.js'

const INDICE_CATALOGO = [
  'lote',
  'administracion_aduanera',
  'clasificacion',
  'recinto',
  'direccion',
  'fecha_subasta',
  'dias_restantes'
]

export async function getCatalogo ($) {
  const $rows = $('table tbody tr')
  const catalogo = []

  $rows.each((_index, el) => {
    const $el = $(el)
    const id = $el.attr('id')
    const detalle = {}
    $el.find('td').each((tdIndex, tdElement) => {
      const tdValue = $(tdElement).text()
      const cleanedValue = cleanText(tdValue)
      const indice = INDICE_CATALOGO[tdIndex]
      detalle[indice] = cleanedValue
    })
    if (detalle.dias_restantes !== 'Cerrado') {
      catalogo.push({
        id,
        ...detalle
      })
    }
  })
  const detalleItems = await getDetalleItems(catalogo)
  return detalleItems
}
