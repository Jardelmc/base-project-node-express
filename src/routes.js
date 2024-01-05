// src/routes.js
import { Router } from 'express';
import SessionController from './app/controllers/sessionController';
import UserController from './app/controllers/uuserController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Rotas públicas
routes.post('/users', UserController.create);
routes.post('/sessions', SessionController.create);

// Rotas autenticadas
routes.use(authMiddleware);
routes.get('/users', UserController.list);
routes.get('/users/:userId', UserController.get);
routes.put('/users/:userId', UserController.update);
routes.delete('/users/:userId', UserController.delete);

export default routes;
