"use strict";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import Database from "./dbs/init.mongodb.js";
import { countConnect, checkOverload } from "./helpers/check.connect.js";
import router from "./routes/index.js";

const app = express()

app.use(express.json())
app.use(morgan("dev")) // GET /users 200 12.345 ms - 123
// app.use(morgan("combined")) // ::1 - - [13/May/2026:10:00:00 +0000] "GET /users HTTP/1.1" 200 123 "-" "Mozilla/5.0"
// app.use(morgan("common")) // ::1 - - [13/May/2026:10:00:00 +0000] "GET /users HTTP/1.1" 200 123
// app.use(morgan("short")) // GET /users 200 12ms - 123
// app.use(morgan("tiny")) // GET /users 200 123 - 12ms

// middleware giúp tăng bảo mật Express bằng cách thêm HTTP security headers để chống các kiểu tấn công phổ biến trên web.
app.use(helmet()) 

// middleware giúp nén HTTP response (gzip/brotli) để giảm size dữ liệu và tăng tốc API/web.
app.use(compression())

// init middlewares

// init db
Database.getInstance()

// countConnect()
// checkOverload()

// init routes
app.use('/api/v1', router);

// handle errors

export default app;