"use strict";

const findByEmail = async ({
    email, 
    select = {email: 1, name: 1, status: 1, roles: 1}
}) => {
    if (!email) return null;

    return Shop.findOne({email}).select(select).lean();
}

export default {
    findByEmail,
}