'use strict';

import Joi from 'joi';

const schema = {
    CREATE_USER: Joi.object({
        code: Joi.string().required(),
        name: Joi.string().required(),
        password: Joi.string().required(),
        email_id: Joi.string().email().required(),
        doj: Joi.string().required(),
        dob: Joi.string().required(),
        gender: Joi.string().required(),
        mobile: Joi.number().required(),
        qualification: Joi.string().required(),
        grade: Joi.string().required(),
        role_id: Joi.string().required(),
        status: Joi.boolean().required(),
    })
}

export {
    schema
}