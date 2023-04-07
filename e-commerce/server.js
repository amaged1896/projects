import express from 'express';
import dotenv from 'dotenv';
import { connection } from './databases/connection.js';
import categoryRouter from './src/modules/category/category.router.js';
dotenv.config();
const app = express();
const port = 8000;

// middleware
app.use(express.json());
app.use('/api/v1/categories', categoryRouter);
app.use('*', (req, res) => res.json({ message: `Can't find this route : ${req.originalUrl}` }));

connection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));