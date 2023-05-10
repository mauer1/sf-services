import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import * as sfdcController from '../controllers/sfdc.controller';

const applicationRoutes: Router = Router();

applicationRoutes.get('/oauth2/callback', authController.callback);

applicationRoutes.get(
  '/query',
  authController.getSfAuth,
  authController.getSfdcConnection,
  sfdcController.query
);

export default applicationRoutes;
