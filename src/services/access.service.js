"use strict";

import bcrypt from 'bcrypt';
import Shop from '../models/shop.model.js';
import crypto from "crypto";
import createTokenPair from '../auth/authUtils.js';
import KeyTokenService from './keyToken.service.js';
import { getInfoData } from '../utils/index.js';

class AccessService {
    signUp = async ({name, email, password}) => {
        try {
            // step1: check email exist
            const checkUser = await Shop.findOne({email}).lean();
            if (checkUser) throw new Error('Email already exists');

            // step2: hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // step3: create user
            const user = await Shop.create({name, email, password: hashedPassword});

            if (!user) throw new Error('Create user failed');

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
            if (!keyStore) throw new Error('Create key token failed');

            // step5: created token pair
            const tokens = await createTokenPair({payload: {userId: user._id, email}, publicKey: keyStore.publicKey, privateKey: keyStore.privateKey});
            if (!tokens) throw new Error('Create tokens failed');

            return {
                code: '00',
                message: 'Success',
                metadata: {
                    user: getInfoData({fields: ['_id', 'name', 'email'], object: user}),
                    tokens: tokens,
                }
            }
        } catch (error) {
            throw error;
        }
    }
}

export default new AccessService();