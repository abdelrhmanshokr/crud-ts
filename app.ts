import express from 'express';
import * as dotenv from 'dotenv';

import { dbconnect }  from './src/db/dbConnection';
import 


dotenv.config();
const app = express();

dbconnect();

app.use(express.json());

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
});