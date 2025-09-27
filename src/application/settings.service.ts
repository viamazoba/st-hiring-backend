import { SettingsRepository, UpdateSettingsDTO } from "../domain/ports/settings.repository";
import { ISettings } from "../domain/models/settings.model";


export interface SettingsService {
    getSettings(clientId: number): Promise<ISettings>;
    updateSettings(clientId: number, settings: UpdateSettingsDTO): Promise<ISettings | null>;
}

export const createSettingsService = (repository: SettingsRepository): SettingsService => {
    return {

        async getSettings(clientId: number): Promise<ISettings> {
            let settings = await repository.getSettingsByClientId(clientId);

            if (!settings) {
                settings = await repository.createDefaultSettings(clientId);
            }

            return settings;
        },

        async updateSettings(clientId: number, settings: UpdateSettingsDTO): Promise<ISettings | null> {
            const updatedSettings = await repository.updateSettingsByClientId(clientId, settings);

            return updatedSettings;
        }
    };
};