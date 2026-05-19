"use strict";

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization',
}

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY];
        if (!key) return res.status(403).json({message: 'Forbidden Error'});

        // check objKey
        const objKey = await apiKeyModel.findOne({key, status: true}).lean();
        if (!objKey) return res.status(403).json({message: 'Forbidden Error'});

        req.objKey = objKey;
        return next();
    } catch (error) {
        return res.status(403).json({message: 'Forbidden Error'});
    }
}