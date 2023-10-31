import express from "express";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import { MongoClient } from 'mongodb';
dotenv.config();

const app = express();
const client = new MongoClient(process.env.MONGO_URL);

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

app.get('/', async (req, res) => {
    try {
        const db = client.db('sample_guides');
        const planets = await db.collection('planets').find({}).toArray();
        console.log(planets);
        res.send(planets).status(200);
        return;
    }
    catch(e) {
        console.log(e);
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});