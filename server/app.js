import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import exphbs from 'express-handlebars';
import Handlebars from 'handlebars';
import csurf from 'csurf';
import flash from 'connect-flash';

import authStatus from './middlware/authStatus.js';
import userModelSetup from './middlware/userModelSetup.js';

import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import { default as connectMongoDBSession } from 'connect-mongodb-session';

// Route imports
import { coursesRouter } from './routes/coursesRouter.js';
import { addRouter } from './routes/addRouter.js';
import { homeRouter } from './routes/homeRouter.js';
import { cartRouter } from './routes/cartRouter.js';
import { checkoutRouter } from './routes/checkoutRouter.js';
import { authRouter } from './routes/authRouter.js';

dotenv.config();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});

const app = express();

// Choosing PORT
const PORT = process.env.PORT || 3000;

// URI
const MONGO_URI = process.env.MONGODB_URI;

// Sessions storage in database
const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({ uri: MONGO_URI, collection: 'session' });

app.use((req, res, next) => {
  console.log(`URL: http://localhost:${PORT}${req.url}, METHOD: ${req.method}`);
  next();
});

// Parsing json input
app.use(express.json());
app.use(express.urlencoded());

// Session and user
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
  })
);
app.use(csurf());
app.use(flash());
app.use((req, res, next) => {
  // console.log(req.session);
  next();
});

app.use(authStatus);
app.use(userModelSetup);

// View Engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', '../views');

// Routes
app.use('/add', addRouter);
app.use('/courses', coursesRouter);
app.use('/cart', cartRouter);
app.use('/checkout', checkoutRouter);
app.use('/auth', authRouter);
app.use('/*', homeRouter);

export { app, PORT, MONGO_URI };
