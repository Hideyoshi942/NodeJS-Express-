"use strict";

import keytokenModel from "../models/keytoken.model.js";

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        try {
            // lv0
            // const filter = { user: userId };
            // const update = {
            //     publicKey,
            //     privateKey,
            //     refreshTokensUsed: [],
            // };
            // const options = { upsert: true, returnDocument: 'after', lean: true };

            // const tokens = await keytokenModel.findOneAndUpdate(filter, update, options);
            // return tokens ?? null;

            // lv xx
            const filter = { user: userId }, 
            update = { publicKey, privateKey, refreshTokensUsed: [], refreshToken },
            options = { upsert: true, lean: true };
            const tokens = await keytokenModel.findOneAndUpdate(filter, update, options);
            return tokens ? tokens.publicKey : null;
        } catch (error) {
            return error;
        }
    }
};

export default KeyTokenService;