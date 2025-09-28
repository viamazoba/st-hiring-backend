# SeeTickets Backend Technical Test

Welcome to the SeeTickets backend test for Mid-Level hires. The purpose of this test is to evaluate the successful integration of new functionality, adherence to Clean Architecture principles, and the inclusion of Unit Tests within an existing codebase.

> ⚠️ **Important Note:**  
> In this project, some environment variables have been hardcoded **solely for technical test purposes**.  
> For professional development, it is recommended to manage configuration using `.env` files and a secure environment variable manager.

## 🚀 Tech Stack

This project utilizes a modern Node.js ecosystem setup and a polyglot persistence model:

- **Node.js**: v18.16.0
- **Framework**: Express.js
- **Lenguaje**: TypeScript
- **Base de Datos SQL**: PostgreSQL (para Events y Tickets)
- **Base de Datos NoSQL**: MongoDB (para Client Settings)
- **ORM/Query Builder**: Knex.js
- **Testing**: Jest
- **Entorno**: Docker & Docker Compose

## 🛠️ Prerequisites

To run and test this project locally, you must have the following installed:

- **Docker**: Required to launch the database containers (PostgreSQL, MongoDB, and their respective UIs).

- **NVM (Node Version Manager)**: Required to ensure you use the specified Node.js version.

- **Yarn**: Used as the package manager (`packageManager: yarn@3.6.1`).

## ⚙️ Setup and Installation

Follow these steps to prepare your environment and install dependencies:

1. **Use right Version of Node**: Ensure you are using the required Node.js version::
   ```bash
   nvm use
   ```
2. **Install Dependencies**: Install all required Node.js packages:
   ```bash
   yarn install
   ```
3. **Start Databases**: Bring up the database containers using Docker Compose. This step starts Postgres, MongoDB, and their respective management UIs (Adminer and Mongo Express).
   ```bash
   docker compose up -d
   ```

## 💾 Database Preparation

Create the necessary tables and populate the events and tickets data:

1. PostgreSQL (SQL) Setup

- **Run Migrations**: Create the events and tickets tables in PostgreSQL:
  ```bash
  yarn migrations:latest
  ```
- **Run Seeds**: Populate the PostgreSQL tables with mock data (run this command multiple times to add more data):
  ```bash
  yarn db:seed
  ```

2. MongoDB (NoSQL) Seed (**optional**)
   To test the GET endpoint for settings, you may want to pre-populate a client document.

- **Run MongoDB Seed**: Insert the default settings document for a specific client ID:
  ```bash
  yarn db:seed:mongo
  ```

## 🏃 Running the API

- Start the Express Server: Run the application using nodemon for hot reloading:
  ```bash
    yarn start
  ```
  The API will be running on http://localhost:3000.

## 💻 API Endpoints

# API Endpoints

The API follows a versioned path structure (`/api/v1/`).

| Endpoint                     | Method | Description                                                                                            | Persistence |
| ---------------------------- | ------ | ------------------------------------------------------------------------------------------------------ | ----------- |
| `/health`                    | GET    | Simple health check.                                                                                   | N/A         |
| `/events`                    | GET    | Retrieves a list of events and their available tickets.                                                | PostgreSQL  |
| `/api/v1/settings/:clientId` | GET    | **New:** Retrieves client settings. If the document does not exist, a default is created and returned. | MongoDB     |
| `/api/v1/settings/:clientId` | PUT    | **New:** Updates the settings document for a given client ID. Includes robust data validation.         | MongoDB     |

---

## Example Usage (Settings Endpoint)

| Command                                       | Action                       | Expected Result                                                  |
| --------------------------------------------- | ---------------------------- | ---------------------------------------------------------------- |
| `GET http://localhost:3000/api/v1/settings/1` | Fetch settings for client 1. | Returns the default settings object (and creates it in MongoDB). |
| `PUT http://localhost:3000/api/v1/settings/1` | Update client 1 settings.    | Returns the updated settings object.                             |

## ✅ Testing

Unit tests are mandatory for all new code. The new code related to the settings functionality is covered by unit tests.

- Run Unit Tests: Execute Jest to run all tests in the project (this includes the new tests for SettingsService). The --watchAll flag keeps Jest running and re-runs tests upon file changes.
  ```bash
    yarn test
  ```
