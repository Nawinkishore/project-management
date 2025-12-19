import express from 'express';
import cors from 'cors';
import "dotenv/config";
import helmet from 'helmet';
import morgan from 'morgan';
// import {z} from 'zod';
import { configDotenv } from 'dotenv';
configDotenv();
// Routes Imports
import projectRoutes from './routes/project.route.js';
import taskRoutes from './routes/tasks.route.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('morgan'));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map