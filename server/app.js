import express from 'express';
import exphbs from 'express-handlebars';
import Handlebars from 'handlebars';

import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import { coursesRouter } from './routes/coursesRouter.js';
import { addRouter } from './routes/addRouter.js';
import { homeRouter } from './routes/homeRouter.js';
import { cartRouter } from './routes/cartRouter.js';
import { trashBinRouter } from './routes/trashBinRouter.js';
import { User, userSchema } from './models/userModel.js';

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});

const app = express();

// Choosing PORT
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  return User.findOne({ email: 'testApp@test.com' }).then(user => {
    if (!user) {
      console.log('CREATING NEW USER!');
      const user = new User({
        email: 'testApp@test.com',
        name: 'testUser1',
        password: 'TESTEST123',
      });

      user.save();

      req.user = user;
      next();
    }

    if (user) {
      req.user = user;
      next();
    }
  });
});

app.use((req, res, next) => {
  console.log(`URL: http://localhost:${PORT}${req.url}, METHOD: ${req.method}`);
  next();
});

// Parsing json input
app.use(express.json());
app.use(express.urlencoded());
// override with the X-HTTP-Method-Override header in the request
//   app.use(methodOverride('X-HTTP-Method-Override'));

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

export { app, PORT };
