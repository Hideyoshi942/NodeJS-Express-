"use strict";

import apiKeyService from "../services/apiKey.service.js";

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization',
}

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY];
        if (!key) return res.status(403).json({message: 'Forbidden Error'});

        // check objKey
        const objKey = await apiKeyService.findById(key);
        if (!objKey) return res.status(403).json({message: 'Forbidden Error'});

        req.objKey = objKey;
        return next();
    } catch (error) {
        return res.status(403).json({message: 'Forbidden Error'});
    }
}

const permission = (permission) => {
    return (req, res, next) => {
        if (!req.objKey.permissions.includes(permission)) {
            return res.status(403).json({message: 'Permission denied'});
        }

        const validPermissions = req.objKey.permissions.includes(permission);
        if (!validPermissions) {
            return res.status(403).json({message: 'Permission denied'});
        }

        return next();
    }
}

const asyncHandler = (func) => {
    return (req, res, next) => {
        Promise.resolve(func(req, res, next)).catch(next);
    }
}

export {apiKey, permission, asyncHandler};