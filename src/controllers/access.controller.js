"use strict";

import AccessService from "../services/access.service.js";

class AccessController {
    signUp = async (req, res, next) => {
        try {
            const { name, email, password } = req.body;
            const result = await AccessService.signUp({ name, email, password });

            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default new AccessController();