import express, { response } from "express";
import bodyParser from 'body-parser';
import axios from "axios";
import dotenv from "dotenv";
import { MongoClient } from 'mongodb';
dotenv.config();

const app = express();

const myURL = new URL(process.env.FIXIE_URL);

if (!process.env.PORT) {
    axios.get('https://thewinklers-3cdfbdc10525.herokuapp.com', {
        proxy: {
            protocol: 'http',
            host: myURL.hostname,
            port: myURL.port,
            auth: {username: myURL.username, password: myURL.password}
        }
    }).then(response => console.log(response.status));
}

const client = new MongoClient(process.env.MONGO_URL);

async function connect() {
    await client.connect();
}

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

app.get('/', async (req, res) => {
    await connect();

    try {
        const db = client.db('sample_guides');
        const planets = await db.collection('planets').find({}).toArray();
        console.log('MU: ', db);
        console.log('MU: ', planets);
        res.send('planets').status(200);
        return;
    }
    catch(e) {
        console.log('error: ', e);
        res.send(e).status(500);
    }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});