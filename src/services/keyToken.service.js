"use strict";

import keytokenModel from "../models/keytoken.model.js";

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey }) => {
        try {
            const filter = { user: userId };
            const update = {
                publicKey,
                privateKey,
                refreshTokensUsed: [],
            };
            const options = { upsert: true, returnDocument: 'after', lean: true };

            const tokens = await keytokenModel.findOneAndUpdate(filter, update, options);
            return tokens ?? null;
        } catch (error) {
            return error;
        }
    }
};

export default KeyTokenService;