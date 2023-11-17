import { getCatalog } from './catalog.js'

export const SCRAPINGS = {
  catalogo: {
    url: 'http://anbsw04.aduana.gob.bo:7551/subastas/lotelista.do?parameter=catalogo',
    scraper: getCatalog,
    options: {
      headers: {
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'es-BO,es-419;q=0.9,es;q=0.8',
        'upgrade-insecure-requests': '1',
        'Referrer-Policy': 'strict-origin-when-cross-origin'
      },
      body: null,
      method: 'GET'
    }
  }
}
