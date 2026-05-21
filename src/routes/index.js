"use strict";
import express from "express";
import accessRouter from "./access/index.js";
import { apiKey, permission } from "../auth/checkAuth.js";
const router = express.Router();

// check apiKey
router.use(apiKey);

// check permissions
router.use('/access', accessRouter);

export default router;