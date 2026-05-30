import express from 'express';
import type { Application, Request, Response, NextFunction } from 'express';
import cors from "cors";
import 'dotenv/config';
import { checkConnection } from './config/database.js';
import routes from "./routes/index.js";
import { errorHandler } from './middlewares/error.middleware.js';

const app: Application = express();
const PORT = process.env.PORT || 5000;
const HOST = `http://localhost:${PORT}`;

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', routes);

app.get('/test-api', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Express API is running."
    });
});

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: `Endpoint ${req.method} ${req.originalUrl} not found`
    });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[Error]:', err.stack || err.message);
  
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

app.use(errorHandler);

checkConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`📡 Test API: ${HOST}/test-api`);
    });
});


export default app;