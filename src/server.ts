import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import mongoose from 'mongoose';
import { getDBURL } from './utils';

const port = process.env.PORT || 3001;

const DB_URL = getDBURL();

mongoose.connect(DB_URL).then((con) => {
  // console.log(con.connection);
  console.log('DB connected');
});

const server = app.listen(port, () => {
  console.log('Listening on port : ' + port);
});

process.on('unhandledRejection', (error: Error) => {
  console.log(error.name, error.message);
  console.log('Unhandled Rejection!!');
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (error: Error) => {
  console.log(error.name, error.message);
  console.log('Uncaught Exception!!');
  server.close(() => {
    process.exit(1);
  });
});
