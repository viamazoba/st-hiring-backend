import { body, ValidationChain } from 'express-validator';

const isBoolean = (field: string): ValidationChain =>
    body(field).optional().isBoolean().withMessage(`${field} must be a boolean`).toBoolean();

const deliveryMethodValidator = [
    body('deliveryMethods.*.name').isString().notEmpty(),
    body('deliveryMethods.*.enum').isString().notEmpty(),
    body('deliveryMethods.*.order').isInt({ min: 1 }),
    isBoolean('deliveryMethods.*.isDefault'),
    isBoolean('deliveryMethods.*.selected'),
];


export const updateSettingsValidation: ValidationChain[] = [

    body('deliveryMethods').optional().isArray().withMessage('deliveryMethods must be an array'),
    ...deliveryMethodValidator,

    isBoolean('fulfillmentFormat.rfid'),
    isBoolean('fulfillmentFormat.print'),

    body('printer.id').optional({ nullable: true })
        .custom((value) => value === null || typeof value === 'string')
        .withMessage('printer.id must be a string or null'),

    isBoolean('printingFormat.formatA'),
    isBoolean('printingFormat.formatB'),

    isBoolean('scanning.scanManually'),
    isBoolean('scanning.scanWhenComplete'),

    isBoolean('paymentMethods.cash'),
    isBoolean('paymentMethods.creditCard'),
    isBoolean('paymentMethods.comp'),

    isBoolean('ticketDisplay.leftInAllotment'),
    isBoolean('ticketDisplay.soldOut'),

    isBoolean('customerInfo.active'),
    isBoolean('customerInfo.basicInfo'),
    isBoolean('customerInfo.addressInfo'),
];