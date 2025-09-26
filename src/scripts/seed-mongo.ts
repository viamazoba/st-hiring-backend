import mongoose from 'mongoose';
import colors from 'colors';
import { SettingsModel } from '../domain/models/settings.model';

const MONGO_URI = 'mongodb://root:example@localhost:27017/seetickets_settings?authSource=admin';

const defaultSettings = {
    clientId: 1,
    deliveryMethods: [{
        name: "Print Now",
        enum: "PRINT_NOW",
        order: 1,
        isDefault: true,
        selected: true
    }, {
        name: "Print@Home",
        enum: "PRINT_AT_HOME",
        order: 2,
        isDefault: false,
        selected: true
    }],
    fulfillmentFormat: { rfid: false, print: false },
    printer: { id: null },
    printingFormat: { formatA: true, formatB: false },
    scanning: { scanManually: true, scanWhenComplete: false },
    paymentMethods: { cash: true, creditCard: false, comp: false },
    ticketDisplay: { leftInAllotment: true, soldOut: true },
    customerInfo: { active: false, basicInfo: false, addressInfo: false }
};

const runSeed = async () => {

    await mongoose.connect(MONGO_URI);

    try {
        console.log(colors.bgMagenta.bold('Checking for existing data for clientId: 1...'));
        const existingSetting = await SettingsModel.findOne({ clientId: 1 });

        if (existingSetting) {
            console.log(colors.bgBlue.bold('Default settings for clientId 1 already exist. Seed not needed.'));
        } else {
            await SettingsModel.create(defaultSettings);
            console.log(colors.bgYellow.bold('Default settings created successfully!'));
        }
    } catch (error) {
        console.error(colors.bgRed('Error running seed:'), error);
    } finally {
        await mongoose.connection.close();
        console.log(colors.bgGreen.bold('MongoDB connection closed.'));
    }
};

runSeed();