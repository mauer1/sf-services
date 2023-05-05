import {Router} from 'express';
import * as sfdcController from '../controllers/sfdc.controller';

const applicationRoutes: Router  = Router();

applicationRoutes.post('/login', sfdcController.login);

export default applicationRoutes;