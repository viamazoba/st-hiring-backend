import { ISettings } from '../models/settings.model';

export type UpdateSettingsDTO = Partial<Omit<ISettings, 'clientId' | 'createdAt' | 'updatedAt'>>;

export interface SettingsRepository {
    getSettingsByClientId(clientId: number): Promise<ISettings | null>;
    updateSettingsByClientId(clientId: number, settings: UpdateSettingsDTO): Promise<ISettings | null>;
    createDefaultSettings(clientId: number): Promise<ISettings>;
}