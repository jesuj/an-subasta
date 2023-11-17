import detailCatalogs from '../db/catalogo.json'
import { serveStatic } from 'hono/cloudflare-workers'

import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()
app.use(cors({ origin: '*' }))

app.get('/', (ctx) =>
  ctx.json([
    {
      endpoint: '/catalogs',
      description: 'Returns all Catalogs',
      parameters: [
        {
          name: 'id',
          endpoint: '/catalogs/:id',
          description: 'Return a catalog by his id'
        },
        {
          name: 'lote',
          endpoint: '/catalogs/:lote',
          description: 'Return a catalog by his lote'
        }
      ]
    }
  ])
)

app.get('/catalogs', (ctx) => ctx.json(detailCatalogs))

app.get('/catalogs/lote/:lote', (ctx) => {
  const lote = ctx.req.param('lote')
  const foundCatalog = detailCatalogs.find((stats) => stats.lote === lote)

  return foundCatalog ? ctx.json(foundCatalog) : ctx.json({ message: 'Catalog not found' }, 404)
})

app.get('/catalogs/:id', (ctx) => {
  const id = ctx.req.param('id')
  const foundCatalog = detailCatalogs.find((stats) => stats.id === id)

  return foundCatalog ? ctx.json(foundCatalog) : ctx.json({ message: 'Catalog not found' }, 404)
})

app.get('/static/*', serveStatic({ root: './' }))
app.get('/favicon.ico', serveStatic({ path: './favicon.ico' }))
app.get('/images/icons/gear.png', serveStatic({ path: './static/icons/hono.png' }))

app.notFound((c) => {
  const { pathname } = new URL(c.req.url)

  if (c.req.url.at(-1) === '/') {
    return c.redirect(pathname.slice(0, -1))
  }

  return c.json({ message: 'Not Found' }, 404)
})

app.onError((err, c) => {
  console.error(`${err}`)
  return c.text('Custom Error Message', 500)
})

// app.showRoutes()

export default app
