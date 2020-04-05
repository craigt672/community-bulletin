  
import express from 'express';
import BodyParser from 'body-parser';

import * as Board from './board';

const BoardRouter = express.Router();

//Middleware
BoardRouter.use(BodyParser.urlencoded({ extended: true }));
BoardRouter.use(BodyParser.json());

//Reads
BoardRouter.route('/').get(Board.getAll);
BoardRouter.route('/:id').get(Board.getById);

//Mutations
BoardRouter.route('/').post(Board.create);
BoardRouter.route('/:id').put(Board.update);
BoardRouter.route('/:id').delete(Board.remove);

//Error
BoardRouter.use(Board.error);

export default BoardRouter;