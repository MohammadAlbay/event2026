// app.ts
import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync, readFileSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = Fastify({ 
  logger: process.env.NODE_ENV === 'production' 
})

// ✅ API Routes
app.get('/api/get-slides', async () => {
  return { result: [
    'A6R_0922-1-e1679641965667-1600x900.webp',
    'art-gallery-event-stockcake.jpg',
    'OIP.webp',
    'Various-artists-Pinta-Miami-2023-exhibition-view-Courtesy-of-Pinta-Miami-2023.jpg'
  ]}
})

// app.post('/api/contact', async (request) => {
//   const { email, message } = request.body as { email?: string; message?: string }
//   // TODO: Add validation & processing
//   return { success: true, message: 'Message received!' }
// })

// ✅ Serve built Vue app (only if dist exists)
const distPath = join(__dirname, 'dist')
if (existsSync(distPath)) {
  await app.register(fastifyStatic, {
    root: distPath,
    prefix: '/',
    wildcard: false, // ⚠️ Critical: don't auto-handle 404s
    // Optional: cache control for prod
    immutable: process.env.NODE_ENV === 'production',
    maxAge: process.env.NODE_ENV === 'production' ? '1d' : '0'
  })
}

// ✅ SPA Fallback: manually serve index.html for browser navigation
app.setNotFoundHandler(async (request, reply) => {
  // 1. Skip API routes
  if (request.url.startsWith('/api')) {
    return reply.code(404).send({ error: 'Route not found' })
  }

  // 2. Only fallback for HTML requests (browser navigation)
  const accept = request.headers.accept || ''
  if (!accept.includes('text/html')) {
    return reply.code(404).send({ error: 'Not found' })
  }

  // 3. Only attempt fallback if dist/index.html exists
  const indexPath = join(distPath, 'index.html')
  if (!existsSync(indexPath)) {
    // Helpful message during development
    if (process.env.NODE_ENV !== 'production') {
      return reply.code(503).send({ 
        error: 'Frontend not built',
        hint: 'Run `npm run build` first, or use `npm run dev` for development'
      })
    }
    return reply.code(404).send({ error: 'Not found' })
  }

  // 4. Serve index.html
  try {
    const content = readFileSync(indexPath, 'utf-8')
    reply.type('text/html').code(200).send(content)
  } catch (err: any) {
    app.log.error('Failed to serve index.html:', err)
    reply.code(500).send({ error: 'Server error' })
  }
})

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 2010
    await app.listen({ port, host: '0.0.0.0' })
    console.log(`🚀 Portfolio live at http://localhost:${port}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()