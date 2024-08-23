import express from 'express';
import router from './routers/route.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
    origin: [
        process.env.FRONTEND_URL,
        'https://todo-list-react-frontend.vercel.app',
        'https://todo-list-react-frontend-erggqrax5-atomchidjais-projects.vercel.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

console.log(`This is a Frontend url : ${process.env.FRONTEND_URL}`);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use('/auth', router);

app.get('/', (req, res) => {
    res.send('Hello Vercel');
});

mongoose.connect(process.env.MONGO_DB_CONNECTION)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.log(`MONGO ERROR : ${err}`);
    });

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT : ${process.env.PORT}`);
});
