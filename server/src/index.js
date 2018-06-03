// import { Session } from './api/models/Session';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import route from './api/routes/';

dotenv.load();

// connect to database
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, err => {
  if (err) {
    console.log(err);
  }
});

// init app
const corsMiddleware = cors({
  origin: [
    // add client IP here in case server does not allow cors
    'http://00.000.000.169:8081',
    'http://00.000.000.169:8000'
  ],
  optionsSuccessStatus: 200,
  credentials: true
});
const app = express();

app.use(corsMiddleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

route(app);
app.listen(process.env.PORT, () => {
  console.log('Example app listening on port', process.env.PORT);
});
