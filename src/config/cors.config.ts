import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        if (!origin) {
            return callback(null, true);
        }

        const whitelist = [
            process.env.FRONTEND_URL,
            'http://localhost:5173',
        ];

        if (whitelist.includes(origin)) {
            callback(null, true);
        } else {
            console.error(`CORS block for domain: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }

    },
    credentials: true,
    methods: ['GET', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
