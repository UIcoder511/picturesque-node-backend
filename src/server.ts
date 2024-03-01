import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import mongoose from 'mongoose';
import { getDBURL } from './utils';

const port = process.env.PORT || 3000;

const DB_URL = getDBURL();

mongoose.connect(DB_URL).then((con) => {
  console.log(con.connection);
  console.log('DB connected');
});

app.listen(port, () => {
  console.log('Listening on port : ' + port);
});
