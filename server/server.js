import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { app } from './app.js';

dotenv.config();

// Choosing PORT
const PORT = process.env.PORT || 3000;

const DB_PASSWORD = process.env.DB_PASSWORD;

app.use((req, res, next) => {
  console.log(`URL: http://localhost:${PORT}${req.url}, METHOD: ${req.method}`);
  next();
});

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
