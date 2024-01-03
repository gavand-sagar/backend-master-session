// all the code to create an api server app...

// CREATE DATA ON SERVER
// GET DATA FROM SERVER
// UPDATE DATA ON SERVER
// DELETE DATA ON SERVER

import express from 'express'
import { config } from 'dotenv';
import { fruitRoutes } from './routes/fruits.js';
import { usersRoutes } from './routes/users.js';
config();

const app = express();
app.use(express.json());// this is to enable json type of body

app.use("/", fruitRoutes)
app.use("/", usersRoutes)


app.listen(3001)