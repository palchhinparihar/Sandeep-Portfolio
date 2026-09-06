import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import connectToMongo from './db.js';

// Routes
import authRoutes from './routes/auth.js';
import testimonialsRoutes from './routes/testimonials.js';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

connectToMongo();

// Enable all CORS requests
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to Sandeep Singh\'s Portfolio Backend!');
});

app.use('/api/admin', authRoutes);
app.use('/api/testimonials', testimonialsRoutes);

app.listen(port, () => {
  console.log(`Backend listening on port http://localhost:${port}`);
});