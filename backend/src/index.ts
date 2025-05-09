import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dashboardRoutes from './routes/dashboardRoutes';
import userRoutes from './routes/userRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import healthRoutes from './routes/healthRoutes';
import coursesRoutes from './courses';
import { errorHandler, logError, logInfo } from './utils/logger';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:8080',
    'https://data-quest-solutions.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Request logging middleware
app.use((req, _res, next) => {
  logInfo(`${req.method} ${req.url}`, {
    body: req.body,
    query: req.query,
    params: req.params
  });
  next();
});

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/users', userRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/courses', coursesRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, _res: express.Response, next: express.NextFunction) => {
  logError(err, req);
  next(err);
});

app.use(errorHandler);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/data-science-hub')
  .then(() => {
    logInfo('Connected to MongoDB');
  })
  .catch((error) => {
    logError(error);
  });

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  logInfo(`Server is running on port ${PORT}`);
  logInfo(`API URL: http://localhost:${PORT}`);
});