"use strict";

import { CREATED, SuccessResponse } from "../core/success.response.js";
import AccessService from "../services/access.service.js";
import { ReasonPhrases } from "../utils/httpStatusCode.js";

class AccessController {

    login = async (req, res, next) => {
        new SuccessResponse({
            message: ReasonPhrases.OK,
            metadata: await AccessService.login(req.body),
        }).send(res);
    }

    signUp = async (req, res, next) => {
        const { name, email, password } = req.body;
        const result = await AccessService.signUp({ name, email, password });

        return new CREATED({
            message: 'Sign up successfully',
            metadata: result,
        }).send(res);
    }
}

export default new AccessController();