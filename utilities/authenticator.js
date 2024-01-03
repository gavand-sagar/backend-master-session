import jwt from 'jsonwebtoken';
export const middleWare = async (req, res, next) => {
    // let client = new MongoClient(process.env.MONGO_CONNECTION_STRING);
    // const connection = await client.connect();
    // const db = connection.db("master-session-db")
    // const users = await db.collection("users")
    //     .find({ username: req.headers.username, password: req.headers.password })
    //     .toArray()
    // if (users && users.length > 0) {
    //     next() // now you can execute next logic
    // } else {
    //     res.status(403).json({ message: "UnAuthrized" })
    // }



    //TOKEN BASED AUTHENTICATION

    try {
        jwt.verify(req.headers.token, process.env.SECRET_KEY)
        next() // now you can execute next logic
    } catch (error) {
        res.status(403).json({ message: "UnAuthrized" })
    }

}
