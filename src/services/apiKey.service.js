"use strict";

import apiKeyModel from "../models/apikey.model.js";

const findById = async (id) => {
    const objKey = await apiKeyModel.findOne({key: id, status: true}).lean();
    return objKey;
}

export default {findById};