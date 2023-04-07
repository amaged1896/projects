import express from 'express';
import dotenv from 'dotenv';
import { connection } from './databases/connection.js';
import categoryRouter from './src/modules/category/category.router.js';
import morgan from 'morgan';
import { AppError } from './src/utlis/AppError.js';
import { globalErrorMiddleware } from './src/middleware/globalErrorMiddleware.js';
import subCategoryRouter from './src/modules/subCategory/subCategory.router.js';
dotenv.config();
const app = express();
const port = 8000;

// middleware
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/subcategories', subCategoryRouter);

// unhandled routes
app.use('*', (req, res, next) => {
    next(new AppError(`Can't find this route : ${req.originalUrl}`, 404));
});

// global error handling middleware
app.use(globalErrorMiddleware);
connection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// unhandled rejection
process.on('unhandledRejection', (err) => {
    console.log('unhandledRejection', err);
});