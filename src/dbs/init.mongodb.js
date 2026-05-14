import mongoose from "mongoose";
import {countConnect} from "../helpers/check.connect.js"

const connectString = "mongodb://localhost:27017/shopDEV";

class Database {
    constructor() {
        this.connect();
    }

    // connect
    async connect(type = 'mongodb') {
        try {
            if (1 === 1) {
                // mongoose.set("debug", true);
                mongoose.set("debug", {color: true});
            }

            await mongoose.connect(connectString, {
                maxPoolSize: 20
            });

            console.log("Connected MongoDB Success", countConnect());

            mongoose.connection.on("error", err => {
                console.error("MongoDB error:", err);
            });

            mongoose.connection.on("disconnected", () => {
                console.log("MongoDB disconnected");
            });

        } catch (err) {
            console.error("Error Connect!", err);
            process.exit(1);
        }
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

export default Database;