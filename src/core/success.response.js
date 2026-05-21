"use strict";

const STATUS_CODE = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    PARTIAL_CONTENT: 206,
    MULTI_STATUS: 207,
}

const REASON_PHRASE = {
    OK: 'SUCCESS',
    CREATED: 'CREATED',
    ACCEPTED: 'ACCEPTED',
    NO_CONTENT: 'NO CONTENT',
    RESET_CONTENT: 'RESET CONTENT',
    PARTIAL_CONTENT: 'PARTIAL CONTENT',
    MULTI_STATUS: 'MULTI STATUS',
}

class SuccessResponse {
    constructor({message, metadata = {}, statusCode = STATUS_CODE.OK, reasonStatusCode = REASON_PHRASE.OK}) {
        this.message = !message ? reasonStatusCode : message;
        this.metadata = metadata;
        this.statusCode = statusCode;
    }

    send(res, headers = {}) {
        return res.status(this.statusCode).json(this);
    }
}

class OK extends SuccessResponse {
    constructor({message, metadata}) {
        super({message, metadata});
    }
}

class CREATED extends SuccessResponse {
    constructor({message, metadata, statusCode = STATUS_CODE.CREATED, reasonStatusCode = REASON_PHRASE.CREATED}) {
        super({message, metadata, statusCode, reasonStatusCode});
    }
}

class ACCEPTED extends SuccessResponse {
    constructor({message, metadata, statusCode = STATUS_CODE.ACCEPTED, reasonStatusCode = REASON_PHRASE.ACCEPTED}) {
        super({message, metadata, statusCode, reasonStatusCode});
    }
}

class NO_CONTENT extends SuccessResponse {
    constructor({message, metadata, statusCode = STATUS_CODE.NO_CONTENT, reasonStatusCode = REASON_PHRASE.NO_CONTENT}) {
        super({message, metadata, statusCode, reasonStatusCode});
    }
}

class RESET_CONTENT extends SuccessResponse {
    constructor({message, metadata, statusCode = STATUS_CODE.RESET_CONTENT, reasonStatusCode = REASON_PHRASE.RESET_CONTENT}) {
        super({message, metadata, statusCode, reasonStatusCode});
    }
}

class PARTIAL_CONTENT extends SuccessResponse {
    constructor({message, metadata, statusCode = STATUS_CODE.PARTIAL_CONTENT, reasonStatusCode = REASON_PHRASE.PARTIAL_CONTENT}) {
        super({message, metadata, statusCode, reasonStatusCode});
    }
}

class MULTI_STATUS extends SuccessResponse {
    constructor({message, metadata, statusCode = STATUS_CODE.MULTI_STATUS, reasonStatusCode = REASON_PHRASE.MULTI_STATUS}) {
        super({message, metadata, statusCode, reasonStatusCode});
    }
}

export { SuccessResponse, OK, CREATED, ACCEPTED, NO_CONTENT, RESET_CONTENT, PARTIAL_CONTENT, MULTI_STATUS };