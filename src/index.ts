import express from 'express';
import { knex } from 'knex';
import colors from 'colors'
import cors from 'cors'
import dbConfig from './knexfile';
import { createEventDAL } from './dal/events.dal';
import { createTicketDAL } from './dal/tickets.dal';
import { createGetEventsController } from './controllers/get-events';
import { connectMongo } from './infrastructure/database/mongo.connection';
import settingsRouter from './routes/settings.route';
import { corsConfig } from './config/cors.config';

// Conection to MongoDB
connectMongo();

// initialize Knex
const Knex = knex(dbConfig.development);

// Initialize DALs
const eventDAL = createEventDAL(Knex);
const TicketDAL = createTicketDAL(Knex);


const app = express();
app.use(cors(corsConfig))

app.use('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/events', createGetEventsController({ eventsDAL: eventDAL, ticketsDAL: TicketDAL }));
app.use('/api/v1/settings', settingsRouter);

app.use('/', (_req, res) => {
  res.json({ message: 'Hello API' });
});


app.listen(3000, () => {
  console.log(colors.bgYellow.bold('Server Started in port 3000'))
});
