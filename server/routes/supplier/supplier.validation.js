'use strict';

import Joi from 'joi';

const schema = {
    CREATE_SUPPLIER: Joi.object({
        code: Joi.string().required(),
        name: Joi.string().required(),
    })
}

export {
    schema
}