"use strict";

import JWT from "jsonwebtoken";

const createTokenPair = async ({ payload, publicKey, privateKey }) => {
    try {
        const accessToken = await JWT.sign(payload, publicKey, {
            algorithm: 'HS256',
            expiresIn: '2 days'
        });

        const refreshToken = await JWT.sign(payload, privateKey, {
            algorithm: 'HS256',
            expiresIn: '7 days'
        });

        JWT.verify(accessToken, publicKey, { algorithms: ["HS256"] }, (err, decoded) => {
            if (err) {
                console.log(`Error verify token: ${err.message}`);
            } else {
                console.log(`Decode verify token:`, decoded);
            }
        });

        return { accessToken, refreshToken };
    } catch (error) {
        throw error;
    }
};

export default createTokenPair;