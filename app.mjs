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
    console.log('a ok');
    // try {
    //     const db = client.db('sample_guides');
    //     const planets = await db.collection('planets').find({}).toArray();
    //     console.log(planets);
    //     res.send(planets).status(200);
    //     return;
    // }
    // catch(e) {
    //     console.log(e);
    // }
    res.send('planets').status(200);
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});