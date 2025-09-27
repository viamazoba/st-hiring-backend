import { SettingsRepository, UpdateSettingsDTO } from '../domain/ports/settings.repository';
import { createSettingsService, SettingsService } from './settings.service';
import { ISettings } from '../domain/models/settings.model';
import { defaultSettings } from '../infrastructure/dal/defaultSettings';

const mockClientId = 123;
const mockExistingSettings: ISettings = {
    clientId: mockClientId,
    deliveryMethods: [{
        name: "Test Method",
        enum: "TEST_ENUM",
        order: 1,
        isDefault: true,
        selected: true
    }],
    fulfillmentFormat: { rfid: true, print: false },
    printer: { id: "P123" },
    printingFormat: { formatA: true, formatB: true },
    scanning: { scanManually: false, scanWhenComplete: true },
    paymentMethods: { cash: false, creditCard: true, comp: false },
    ticketDisplay: { leftInAllotment: false, soldOut: true },
    customerInfo: { active: true, basicInfo: true, addressInfo: false },
} as unknown as ISettings;

let mockRepository: SettingsRepository;
let settingsService: SettingsService;

describe('SettingsService', () => {

    beforeEach(() => {

        mockRepository = {
            getSettingsByClientId: jest.fn(),
            updateSettingsByClientId: jest.fn(),
            createDefaultSettings: jest.fn(),
        };

        settingsService = createSettingsService(mockRepository);
    });

    describe('getSettings', () => {

        test('should return existing settings when found in repository', async () => {

            (mockRepository.getSettingsByClientId as jest.Mock).mockResolvedValue(mockExistingSettings);

            const result = await settingsService.getSettings(mockClientId);

            expect(result).toEqual(mockExistingSettings);

            expect(mockRepository.getSettingsByClientId).toHaveBeenCalledWith(mockClientId);
            expect(mockRepository.createDefaultSettings).not.toHaveBeenCalled();
        });

        test('should create and return default settings when none exist', async () => {

            (mockRepository.getSettingsByClientId as jest.Mock).mockResolvedValue(null);

            const mockDefaultSettings = { ...defaultSettings, clientId: mockClientId } as unknown as ISettings;
            (mockRepository.createDefaultSettings as jest.Mock).mockResolvedValue(mockDefaultSettings);

            const result = await settingsService.getSettings(mockClientId);

            expect(result).toEqual(mockDefaultSettings);

            expect(mockRepository.getSettingsByClientId).toHaveBeenCalledWith(mockClientId);
            expect(mockRepository.createDefaultSettings).toHaveBeenCalledWith(mockClientId);
            expect(mockRepository.updateSettingsByClientId).not.toHaveBeenCalled();
        });

        test('should propagate error when repository fails to get settings', async () => {
            const expectedError = new Error('Database connection failed');
            (mockRepository.getSettingsByClientId as jest.Mock).mockRejectedValue(expectedError);

            await expect(settingsService.getSettings(mockClientId)).rejects.toThrow('Database connection failed');

            expect(mockRepository.getSettingsByClientId).toHaveBeenCalled();
            expect(mockRepository.createDefaultSettings).not.toHaveBeenCalled();
        });
    });

    describe('updateSettings', () => {

        const updatePayload: UpdateSettingsDTO = {
            ticketDisplay: {
                soldOut: false,
                leftInAllotment: false
            },
            paymentMethods: { cash: false, creditCard: true, comp: true }
        };

        test('should call repository to update and return updated settings', async () => {
            const mockUpdatedSettings = { ...mockExistingSettings, ...updatePayload } as unknown as ISettings;

            (mockRepository.updateSettingsByClientId as jest.Mock).mockResolvedValue(mockUpdatedSettings);

            const result = await settingsService.updateSettings(mockClientId, updatePayload);

            expect(result).toEqual(mockUpdatedSettings);

            expect(mockRepository.updateSettingsByClientId).toHaveBeenCalledWith(mockClientId, updatePayload);
            expect(mockRepository.getSettingsByClientId).not.toHaveBeenCalled();
            expect(mockRepository.createDefaultSettings).not.toHaveBeenCalled();
        });

        test('should return null when repository does not find/update settings', async () => {

            (mockRepository.updateSettingsByClientId as jest.Mock).mockResolvedValue(null);

            const result = await settingsService.updateSettings(mockClientId, updatePayload);

            expect(result).toBeNull();

            expect(mockRepository.updateSettingsByClientId).toHaveBeenCalledWith(mockClientId, updatePayload);
        });

        test('should propagate error when repository fails to update settings', async () => {
            const expectedError = new Error('Mongo write error');
            (mockRepository.updateSettingsByClientId as jest.Mock).mockRejectedValue(expectedError);

            await expect(settingsService.updateSettings(mockClientId, updatePayload)).rejects.toThrow('Mongo write error');

            expect(mockRepository.updateSettingsByClientId).toHaveBeenCalled();
        });
    });
});