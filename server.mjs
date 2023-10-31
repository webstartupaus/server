import express from "express";
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";
import dotenv from 'dotenv';

const env = dotenv.config().parsed;
const port = env.PORT;
const app = express();

app.use(express.json());
app.use("/record", records);

app.all('*', function (req, res) {
    res.sendFile(__dirname + '/index.js') /* <= Where my ng-view is located */
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// app.use((req, res, next) => {
//     // req.headers['Access-Control-Allow-Origin'] = ['http://192.168.68.115:3000', 'http://localhost:3000'];
//     res.set('Access-Control-Allow-Origin', 'http://192.168.68.115:3000');
//     // res.header['Access-Control-Allow-Origin'] = 'http://localhost:3000';
//     res.header['Access-Control-Allow-Credentials'] = true;
//     next();
// });