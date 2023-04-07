import express from 'express';
import dotenv from 'dotenv';
import { connection } from './databases/connection.js';
import categoryRouter from './src/modules/category/category.router.js';
import morgan from 'morgan';
import { AppError } from './src/utlis/AppError.js';
dotenv.config();
const app = express();
const port = 8000;

// middleware
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1/categories', categoryRouter);

// unhandled routes
app.use('*', (req, res, next) => {
    next(new AppError(`Can't find this route : ${req.originalUrl}`, 404));
});

// global error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(500).json({ error: err.message, statusCode });
});
connection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// unhandled rejection
process.on('unhandledRejection', (err) => {
    console.log('unhandledRejection', err);
});