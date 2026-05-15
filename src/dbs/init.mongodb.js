import mongoose from "mongoose";
import {countConnect} from "../helpers/check.connect.js"
import getConfig from "../configs/config.mongodb.js";

class Database {
    constructor() {
        this.connect();
    }

    // connect
    async connect(type = 'mongodb') {
        try {
            const { db: { host, name, port } } = getConfig();
            const connectString = `mongodb://${host}:${port}/${name}`;

            if (1 === 1) {
                // mongoose.set("debug", true);
                mongoose.set("debug", {color: true});
            }

            console.log(connectString);
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