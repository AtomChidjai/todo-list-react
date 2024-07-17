import express from 'express';
import router from './routers/route.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/auth', router);

app.listen(3000, () => {
    console.log('Server is running');
});

// mongoose.connect(process.env.MONGO_DB_CONNECTION, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then( () => {
//     console.log('MongoDB connected');
//     app.listen(3000, () => {
//         console.log('Server is running');
//     });
// })
// .catch((err) => {
//     console.log(`MONGODB ERROR : ${err}`);
// })