import { Request, Response } from "express";
import { SettingsService } from "../application/settings.service";
import { UpdateSettingsDTO } from "../domain/ports/settings.repository";


export const createGetSettingsController = (service: SettingsService) =>
    async (req: Request, res: Response): Promise<void> => {

        const clientId = parseInt(req.params.clientId as string, 10);

        if (isNaN(clientId)) {
            res.status(400).json({ error: 'Client ID must be a valid number' });
            return;
        }

        try {
            const settings = await service.getSettings(clientId);
            res.json(settings);
        } catch (error) {
            console.error('Error fetching settings:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

export const createUpdateSettingsController = (service: SettingsService) =>
    async (req: Request, res: Response): Promise<void> => {
        const clientId = parseInt(req.params.clientId as string, 10);
        const settingsToUpdate: UpdateSettingsDTO = req.body;

        if (isNaN(clientId)) {
            res.status(400).json({ error: 'Client ID must be a valid number' });
            return;
        }

        try {
            const updatedSettings = await service.updateSettings(clientId, settingsToUpdate);

            if (!updatedSettings) {
                res.status(404).json({ error: 'Settings document not found for this client ID' });
                return;
            }

            res.json(updatedSettings);
        } catch (error) {
            console.error('Error updating settings:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };