import express from 'express';
import router from './routers/route.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'http://127.0.0.1:5173',
    credentials: true
}));

app.use('/auth', router);

mongoose.connect(process.env.MONGO_DB_CONNECTION)
.then( () => {
    console.log('MongoDB connected');
})
.catch( (err) => {
    console.log(`MONGO ERROR : ${err}`)
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT : ${process.env.PORT}`);
});