import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = Fastify({
  logger: process.env.NODE_ENV === "production",
});

// Configure Nodemailer Transport (Adjust with your SMTP credentials)
const transporter = nodemailer.createTransport({
  host: "mail.laportadiroma.com", // Change if using external SMTP
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "reservations@laportadiroma.com", // Your event mail account
    pass: "YOUR_SECURE_PASSWORD", // Your email password
  },
});

// 1. Serve Static Assets (Images, Slide WebPs)
// Place your event images in a folder named 'assets' in your project root
app.register(fastifyStatic, {
  root: join(__dirname, "assets"),
  prefix: "/assets/",
  immutable: process.env.NODE_ENV === "production",
  maxAge: process.env.NODE_ENV === "production" ? "30d" : "0",
});

// 2. API Route: Get Slides List
app.get("/api/get-slides", async () => {
  return {
    result: [
      "A6R_0922-1-e1679641965667-1600x900.webp",
      "art-gallery-event-stockcake.jpg",
      "OIP.webp",
      "Various-artists-Pinta-Miami-2023-exhibition-view-Courtesy-of-Pinta-Miami-2023.jpg",
    ],
  };
});

// 3. API Route: Reserve a Seat (Send Email)
interface ReservationBody {
  email: string;
  name?: string;
  phone?: string;
}

app.post("/api/contact", async (request, reply) => {
  const { email, name, phone } = request.body as ReservationBody;

  if (!email) {
    return reply.code(400).send({ success: false, error: "Email is required" });
  }

  try {
    // Send email alert to you/the team
    await transporter.sendMail({
      from: '"La Porta Di Roma Events" <reservations@laportadiroma.com>',
      to: "management-email@laportadiroma.com", // Where you want to receive notifications
      subject: "New Event Seat Reservation! 🎟️",
      html: `
        <h3>New Reservation Details:</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Name:</strong> ${name || "Not provided"}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      `,
    });

    return { success: true, message: "Seat reserved successfully!" };
  } catch (error: Error | any) {
    app.log.error(error, "Email sending failed:");
    return reply
      .code(500)
      .send({ success: false, error: "Failed to process reservation" });
  }
});

// Start Server
const start = async () => {
  try {
    const port = Number(process.env.PORT) || 2010;
    // Listening on 0.0.0.0 allows it to accept requests channeled from your proxy
    await app.listen({ port, host: "0.0.0.0" });
    console.log(`🚀 Event backend service live on port ${port}`);
  } catch (err: any) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

// // app.ts
// import Fastify from 'fastify'
// import fastifyStatic from '@fastify/static'
// import { fileURLToPath } from 'url'
// import { dirname, join } from 'path'
// import { existsSync, readFileSync } from 'fs'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

// const app = Fastify({
//   logger: process.env.NODE_ENV === 'production'
// })

// // ✅ API Routes
// app.get('/api/get-slides', async () => {
//   return { result: [
//     'A6R_0922-1-e1679641965667-1600x900.webp',
//     'art-gallery-event-stockcake.jpg',
//     'OIP.webp',
//     'Various-artists-Pinta-Miami-2023-exhibition-view-Courtesy-of-Pinta-Miami-2023.jpg'
//   ]}
// })

// // app.post('/api/contact', async (request) => {
// //   const { email, message } = request.body as { email?: string; message?: string }
// //   // TODO: Add validation & processing
// //   return { success: true, message: 'Message received!' }
// // })

// // ✅ Serve built Vue app (only if dist exists)
// const distPath = join(__dirname, 'dist')
// if (existsSync(distPath)) {
//   await app.register(fastifyStatic, {
//     root: distPath,
//     prefix: '/',
//     wildcard: false, // ⚠️ Critical: don't auto-handle 404s
//     // Optional: cache control for prod
//     immutable: process.env.NODE_ENV === 'production',
//     maxAge: process.env.NODE_ENV === 'production' ? '1d' : '0'
//   })
// }

// // ✅ SPA Fallback: manually serve index.html for browser navigation
// app.setNotFoundHandler(async (request, reply) => {
//   // 1. Skip API routes
//   if (request.url.startsWith('/api')) {
//     return reply.code(404).send({ error: 'Route not found' })
//   }

//   // 2. Only fallback for HTML requests (browser navigation)
//   const accept = request.headers.accept || ''
//   if (!accept.includes('text/html')) {
//     return reply.code(404).send({ error: 'Not found' })
//   }

//   // 3. Only attempt fallback if dist/index.html exists
//   const indexPath = join(distPath, 'index.html')
//   if (!existsSync(indexPath)) {
//     // Helpful message during development
//     if (process.env.NODE_ENV !== 'production') {
//       return reply.code(503).send({
//         error: 'Frontend not built',
//         hint: 'Run `npm run build` first, or use `npm run dev` for development'
//       })
//     }
//     return reply.code(404).send({ error: 'Not found' })
//   }

//   // 4. Serve index.html
//   try {
//     const content = readFileSync(indexPath, 'utf-8')
//     reply.type('text/html').code(200).send(content)
//   } catch (err: any) {
//     app.log.error('Failed to serve index.html:', err)
//     reply.code(500).send({ error: 'Server error' })
//   }
// })

// const start = async () => {
//   try {
//     const port = Number(process.env.PORT) || 2010
//     await app.listen({ port, host: '0.0.0.0' })
//     console.log(`🚀 Portfolio live at http://localhost:${port}`)
//   } catch (err) {
//     app.log.error(err)
//     process.exit(1)
//   }
// }

// start()
