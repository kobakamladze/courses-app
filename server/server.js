import express from 'express';
import exphbs from 'express-handlebars';
import mongoose from 'mongoose';

import { coursesRouter } from './routes/coursesRouter.js';
import { addRouter } from './routes/addRouter.js';
import { homeRouter } from './routes/homeRouter.js';
import { cartRouter } from './routes/cartRouter.js';
import { trashBinRouter } from './routes/trashBinRouter.js';

// Choosing PORT
const PORT = process.env.PORT || 3000;

const DB_PASSWORD = process.env.DB_PASSWORD;

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});

const app = express();

// Parsing json input
app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
  console.log(`URL: http://localhost:${PORT}${req.url}, METHOD: ${req.method}`);
  next();
});

// View Engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', '../views');

// Routes
app.use('/add', addRouter);
app.use('/courses', coursesRouter);
app.use('/cart', cartRouter);
app.use('/trash', trashBinRouter);
app.use('/*', homeRouter);

mongoose
  .connect(
    `mongodb+srv://koba08:${DB_PASSWORD}@coursesapp.bki86ux.mongodb.net/?retryWrites=true&w=majority`,
    () => console.log('Connected to DB...')
  )
  .then(() =>
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`))
  )
  .catch(err => console.log(err));
