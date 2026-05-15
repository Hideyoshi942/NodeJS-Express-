"use strict";

class AccessController {
    signUp = async (req, res, next) => {
        try {
            console.log(req.body);

            return res.status(200).json({
                code: '00',
                message: 'Success',
                metadata: req.body
            })
        } catch (error) {
            next(error);
        }
    }
}

export default new AccessController();