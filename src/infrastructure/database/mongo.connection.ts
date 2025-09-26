import mongoose from 'mongoose';
import colors from 'colors'
import { exit } from 'node:process'

const MONGO_URI = 'mongodb://root:example@localhost:27017/seetickets_settings?authSource=admin';

export const connectMongo = async () => {
    try {
        const connection = await mongoose.connect(MONGO_URI);
        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log(colors.bgMagenta.bold(`MongoDB connected to: ${url}`))
    } catch (error) {
        console.log(colors.bgRed('Error in connection to MongoDB'), error)
        exit(1)
    }
};