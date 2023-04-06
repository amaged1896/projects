import express from 'express';
import { dbConnection } from './databases/dbConnection.js';
import userRouter from './src/modules/user/user.router.js';
import postRouter from './src/modules/posts/post.router.js';

const app = express();
const port = 3000;
dbConnection();
app.use(express.json());
// routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);


app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));