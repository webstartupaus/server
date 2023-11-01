import express from "express";
import bodyParser from 'body-parser';
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);


app.get('/', async (req, res) => {
    res.send('ok').status(200);
});

app.post('/login', async (req, res) => {
    const planets = await fetch('https://ap-southeast-2.aws.data.mongodb-api.com/app/data-ofcmr/endpoint/planet', {
        method: 'post',
        body: 'planet nine'
    });

    res.send('planets').status(200);
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});