import { SettingsRepository, UpdateSettingsDTO } from '../../domain/ports/settings.repository';
import { SettingsModel, ISettings } from '../../domain/models/settings.model';
import { defaultSettings } from './defaultSettings';

export const createSettingsRepository = (): SettingsRepository => {
    return {
        async getSettingsByClientId(clientId: number): Promise<ISettings | null> {
            return SettingsModel.findOne({ clientId }).exec();
        },

        async updateSettingsByClientId(clientId: number, settings: UpdateSettingsDTO): Promise<ISettings | null> {
            return SettingsModel.findOneAndUpdate(
                { clientId },
                { $set: settings },
                { new: true, runValidators: true }
            ).exec();
        },

        async createDefaultSettings(clientId: number): Promise<ISettings> {
            const newSettings = new SettingsModel({
                ...defaultSettings,
                clientId: clientId,
            });
            return newSettings.save();
        }
    };
};