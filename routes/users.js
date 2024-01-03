
import { Router } from "express";
import jwt from 'jsonwebtoken';
import { body, validationResult } from "express-validator";
import { createHmac } from 'crypto';
import { getDb } from "../utilities/db.js";

export const usersRoutes = Router();


function hashedValue(value) {

    const secret = process.env.HASH_KEY;
    const hash = createHmac('sha256', secret)
        .update(value)
        .digest('hex');
    console.log(hash);
    return hash

}



usersRoutes.post('/signup',
    body('username').notEmpty(),
    body('password').notEmpty(),
    async (req, res) => {

        // body validations
        const result = validationResult(req)
        if (!result.isEmpty()) {
            res.json({ errors: result.array() });
            return;
        }

        const db = await getDb()

        const alreadyExists = await db.collection("users").find({ username: req.body.username }).toArray();

        if (alreadyExists && alreadyExists.length > 0) {
            res.json({ errors: "Username is already taken." });
            return;
        }


        let objToInsert = {
            username: req.body.username,
            password: hashedValue(req.body.password)
        }

        await db.collection("users").insertOne(objToInsert)
        res.send("created");

    })

//TODO-remove
usersRoutes.post('/login', async (req, res) => {
    const db = await getDb()

    let objToMatch = {
        username: req.body.username,
        password: hashedValue(req.body.password)
    }


    const users = await db.collection("users")
        .find(objToMatch)
        .toArray()

    if (users && users.length > 0) {

        let token = jwt.sign({ username: req.body.username }, process.env.SECRET_KEY, { expiresIn: '2h' })
        res.json({ isAuthenticated: true, token: token })
    } else {
        res.json({ isAuthenticated: false })
    }
})


usersRoutes.get('/users', async (req, res) => {
    const db = await getDb()


    const users = await db.collection("users")
        .find()
        .toArray();

    res.json(users)
})

usersRoutes.delete('/users', async (req, res) => {


    const db = await getDb()

    const users = await db.collection("users")
        .deleteMany()

    res.json(users)
})