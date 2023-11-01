import express from "express";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

async function dbConnect() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Success connecting to Atlas!'))
        .catch((error) => console.log('Error connecting to Atlas', error));
}

dbConnect();

app.post('/', async (req, res) => {
    res.send('ok').status(200);
});

app.post('/login', async (req, res) => {
    console.log('get: ', client);
    res.send('planets').status(200);
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});