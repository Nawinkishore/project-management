import 'dotenv/config';
import http from 'http';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import {z} from 'zod';

const envSchema = z.object({
    PORT:z.string().default("5000"),
    NODE_ENV:z.enum(['development','production']).default('development'),
    CLIENT_URL:z.string().default('http://localhost:3000'),
})

const env = envSchema.parse(process.env);

// APP INITIALIZATION
const app = express();

// GLOBAL MIDDLEWARES

// Set security HTTP headers
app.use(helmet());

// Enable CORS
app.use(cors({
    origin: env.CLIENT_URL,
    methods: ['GET','POST','PUT','DELETE','PATCH','OPTIONS'],
    credentials: true,
}));

// Body parser, reading data from body into req.body
app.use(express.json({limit:'10kb'}));
app.use(express.urlencoded({extended:true}));

// health check route
app.get('/health', (req, res) => {
    res.status(200).json({status:'OK', timestamp: new Date().toISOString()});
});


// 404 handler
app.use((_req,res)=>{
    res.status(404).json({message:'Route not found'});
});

// ============================
// Global error handler
// ============================
app.use(
  (
    err: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error("Unhandled error:", err);

    res.status(500).json({
      message: "Internal server error",
    });
  }
);

// ============================
// Server start
// ============================
const PORT = Number(env.PORT) || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(` Environment: ${env.NODE_ENV}`);
});
