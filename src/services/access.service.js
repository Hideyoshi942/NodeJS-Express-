"use strict";

import bcrypt from 'bcrypt';
import Shop from '../models/shop.model.js';
import crypto from "node:crypto";
import createTokenPair from '../auth/authUtils.js';
import KeyTokenService from './keyToken.service.js';
import { getInfoData } from '../utils/index.js';
import { ConflictRequestError, InternalServerError } from '../core/error.response.js';
import ShopService from './shop.service.js';

class AccessService {

    /*
    Step 1: check email in db
    Step 2: match password
    Step 3: Create AT vs RT and save
    Step 4: get data return login
    */
    login = async ({email, password}) => {
        // 1.
        const foundShop = await ShopService.findByEmail({email});
        if (!foundShop) throw new BadRequestError('Shot not registered');

        // 2.
        const match = await bcrypt.compare(password, foundShop.password);
        if (!match) throw new AuthFailureError('Authentication error');

        // 3.
        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');

        // 4.
        const tokens = await createTokenPair({ payload: { userId: foundShop._id, email }, publicKey, privateKey });

        await KeyTokenService.createKeyToken({ publicKey, privateKey, refreshToken: tokens.refreshToken });

        return {
            shop: getInfoData({fields: ['_id', 'name', 'email'], object: foundShop}),
            tokens,
        }
    }

    signUp = async ({name, email, password}) => {
        // try {
            // step1: check email exist
            const checkUser = await Shop.findOne({email}).lean();
            if (checkUser) throw new ConflictRequestError('Email already exists');

            // step2: hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // step3: create user
            const user = await Shop.create({name, email, password: hashedPassword});

            if (!user) throw new InternalServerError('Create user failed');

            // created privateKey and publicKey
            // const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
            //     modulusLength: 4096, // length of the key in bits
            //     publicKeyEncoding: {
            //         type: 'spki',
            //         format: 'pem'
            //     },
            //     privateKeyEncoding: {
            //         type: 'pkcs8',
            //         format: 'pem'
            //     }
            // });

            const privateKey = crypto.randomBytes(64).toString('hex');
            const publicKey = crypto.randomBytes(64).toString('hex');
            
            // step4: create key token
            const keyStore = await KeyTokenService.createKeyToken({userId: user._id, publicKey, privateKey});
            if (!keyStore) throw new InternalServerError('Create key token failed');

            // step5: created token pair (use generated secrets; do not rely on DB read-back)
            const tokens = await createTokenPair({
                payload: { userId: user._id, email },
                publicKey,
                privateKey,
            });
            if (!tokens) throw new InternalServerError('Create tokens failed');

            return {
                code: '00',
                message: 'Success',
                metadata: {
                    user: getInfoData({fields: ['_id', 'name', 'email'], object: user}),
                    tokens: tokens,
                }
            }
        // } catch (error) {
        //     return next(error);
        // }
    }
}

export default new AccessService();