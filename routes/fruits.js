
import { Router } from "express";
import { middleWare } from "../utilities/authenticator.js";
import { ObjectId } from "mongodb";
import { getDb } from "../utilities/db.js";
export const fruitRoutes = Router();

fruitRoutes.get('/fruits', middleWare, async (req, res) => {
    // get data from database
    const db = await getDb()
    const data = await db.collection("fruits").find().toArray();
    res.json(data);

})

fruitRoutes.post('/fruits', middleWare, async (req, res) => {
    // add data in the database
    const db = await getDb()
    await db.collection("fruits").insertOne(req.body)
    res.send("created");
})

fruitRoutes.delete("/fruits/:something", middleWare, async (req, res) => {
    // delete data from the database
    const db = await getDb()

    let something = req.params.something;

    await db.collection("fruits").deleteOne({ _id: new ObjectId(something) })
    res.send("deleted.");
})
