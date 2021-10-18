# Industry Logger Admin Frontend

# General
## What?

Industry Logger is a software to receive and translate Industrial PLC binary code to be watched anytime, anywhere.`

## How?
With a Raspberry Pi connected via ModBus to the PLC, the raw information(binary) can be sent to our Nest.js Server.<br/>

## About this project
The Industry Logger Backend manage to store technical information provided on Admin Frontend, translate into relevant information, 
and provide this data anywhere to a mobile app.

# Developer

### Requirements
To run this project you will need:

- Node v12 or greater - [download v12.14.1 (recommended)](https://nodejs.org/download/release/v12.14.1/)
- MySQL 8.0 - [download](https://dev.mysql.com/downloads/mysql/)

### Steps:
The steps to run this project are:

- Go to the root folder, `.../industry-logger-backend`
- Run `npm install` or `yarn install`.
- Run `npm start:dev` or `yarn start:dev`.
- Have fun!

### Important Libraries
The libraries that are important for this project are:
- Nest.js
- TypeORM
- Knex
- Lodash