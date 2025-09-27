import { Router } from 'express';
import { createSettingsService } from '../application/settings.service';
import { createSettingsRepository } from '../infrastructure/dal/settings.repository';
import { createGetSettingsController, createUpdateSettingsController } from '../controllers/settings.controller';
import { handleInputErrors } from '../middleware/handleInputErros';
import { updateSettingsValidation } from './validators/settings.validator';


const settingsRepository = createSettingsRepository();
const settingsService = createSettingsService(settingsRepository);

const getSettingsController = createGetSettingsController(settingsService);
const updateSettingsController = createUpdateSettingsController(settingsService);

const router = Router();


router.get('/:clientId', getSettingsController);

router.put('/:clientId',
    updateSettingsValidation,
    handleInputErrors,
    updateSettingsController
);

export default router;