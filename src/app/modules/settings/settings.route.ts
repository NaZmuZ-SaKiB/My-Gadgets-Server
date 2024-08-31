import { Router } from 'express';
import { SettingsController } from './settings.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { SettingsValidation } from './settings.validation';

const router = Router();

// GET
router.get('/', SettingsController.get);

// PATCH
router.patch(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  validateRequest(SettingsValidation.update),
  SettingsController.update,
);
