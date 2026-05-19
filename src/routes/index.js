"use strict";
import express from "express";
import accessRouter from "./access/index.js";
const router = express.Router();

// check apiKey


// check permissions


router.use('/access', accessRouter);

export default router;