// all the code to create an api server app...

// CREATE DATA ON SERVER
// GET DATA FROM SERVER
// UPDATE DATA ON SERVER
// DELETE DATA ON SERVER

import express from 'express'
import { MongoClient, ObjectId } from 'mongodb'
import { connectionString } from './constants.js';

const app = express();
app.use(express.json());// this is to enable json type of body



app.get('/fruits', async (req, res) => {
    // get data from database
    let client = new MongoClient(connectionString);
    const connection = await client.connect();
    const db = connection.db("master-session-db")


    const data = await db.collection("fruits").find().toArray();
    res.json(data);

})

app.post('/fruits', async (req, res) => {
    // add data in the database
    let client = new MongoClient(connectionString);
    const connection = await client.connect();
    const db = connection.db("master-session-db")


    await db.collection("fruits").insertOne(req.body)
    res.send("created");
})

app.delete("/fruits/:something", async (req, res) => {
    // delete data from the database
    let client = new MongoClient(connectionString);
    const connection = await client.connect();
    const db = connection.db("master-session-db")

    let something = req.params.something;

    await db.collection("fruits").deleteOne({ _id: new ObjectId(something) })
    res.send("deleted.");
})


app.listen(3001)