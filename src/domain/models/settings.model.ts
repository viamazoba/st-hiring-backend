import { Schema, model, Document } from 'mongoose';

interface IDeliveryMethod {
    name: string;
    enum: string;
    order: number;
    isDefault: boolean;
    selected: boolean;
}

export interface ISettings extends Document {
    clientId: number;
    deliveryMethods: IDeliveryMethod[];
    fulfillmentFormat: { rfid: boolean; print: boolean; };
    printer: { id: string | null; };
    printingFormat: { formatA: boolean; formatB: boolean; };
    scanning: { scanManually: boolean; scanWhenComplete: boolean; };
    paymentMethods: { cash: boolean; creditCard: boolean; comp: boolean; };
    ticketDisplay: { leftInAllotment: boolean; soldOut: boolean; };
    customerInfo: { active: boolean; basicInfo: boolean; addressInfo: boolean; };
}

const deliveryMethodSchema = new Schema<IDeliveryMethod>({
    name: { type: String, required: true },
    enum: { type: String, required: true },
    order: { type: Number, required: true },
    isDefault: { type: Boolean, required: true },
    selected: { type: Boolean, required: true }
}, { _id: false });


const settingsSchema = new Schema<ISettings>({
    clientId: { type: Number, required: true, unique: true, index: true },
    deliveryMethods: [deliveryMethodSchema],
    fulfillmentFormat: { rfid: Boolean, print: Boolean },
    printer: { id: Schema.Types.Mixed },
    printingFormat: { formatA: Boolean, formatB: Boolean },
    scanning: { scanManually: Boolean, scanWhenComplete: Boolean },
    paymentMethods: { cash: Boolean, creditCard: Boolean, comp: Boolean },
    ticketDisplay: { leftInAllotment: Boolean, soldOut: Boolean },
    customerInfo: { active: Boolean, basicInfo: Boolean, addressInfo: Boolean }
}, {
    timestamps: true
});

export const SettingsModel = model<ISettings>('Setting', settingsSchema);