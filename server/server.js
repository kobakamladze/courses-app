import mongoose from 'mongoose';

import { app, PORT, MONGO_URI } from './app.js';

// Checking database connection status
mongoose.connection.once('open', () => console.log('Connected to DB...'));
mongoose.connection.on('error', error => console.log(error));

// Connectign to DB and starting serevr
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`))
  )
  .catch(err => console.log(err))
  .finally();
