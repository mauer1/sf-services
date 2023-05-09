import { Router } from 'express';
import * as sfdcController from '../controllers/sfdc.controller';

const applicationRoutes: Router = Router();

applicationRoutes.get(
  '/query',
  sfdcController.getSfConnection,
  sfdcController.query
);

export default applicationRoutes;
