import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { app, PORT } from './app.js';

dotenv.config();

const DB_PASSWORD = process.env.DB_PASSWORD;

// Checking database connection status
mongoose.connection.once('open', () => console.log('Connected to DB...'));
mongoose.connection.on('error', error => console.log(error));

// Connectign to DB and starting serevr
mongoose
  .connect(
    `mongodb+srv://koba08:${DB_PASSWORD}@coursesapp.bki86ux.mongodb.net/?retryWrites=true&w=majority`
    // { useNewUrlParser: true }
  )
  .then(() =>
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`))
  )
  .catch(err => console.log(err));
