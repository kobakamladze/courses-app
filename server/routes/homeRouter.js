import express from 'express';

const homeRouter = express.Router();

homeRouter.get('/', (req, res) => res.render('index', { title: 'Main Page' }));

export { homeRouter };
