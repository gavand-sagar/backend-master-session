import { MongoClient } from "mongodb";

let db = null;

export async function getDb() {
    if (db) {
        return db;
    } else {
        let client = new MongoClient(process.env.MONGO_CONNECTION_STRING, { minPoolSize: 50, maxPoolSize: 100 });
        const connection = await client.connect();
        db = connection.db("master-session-db");
        return db;
    }
}