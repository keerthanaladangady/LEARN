'use strict';

const dataType = {
    QUERY: 'query',
    BODY: 'body',
    PARAMS: 'params'
}

/**
 * Function to validate request.
 * @param {Object} validateObj 
 * @param {Request} req 
 * @param {Response} res 
 * @param {Callback} next 
 * @returns 
 */
const validRequest = (validateObj, req, res, next) => {
    const { schema, dataType } = validateObj;
    const dataObj = req[dataType];
    const validate = schema.validate(dataObj, {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    })
    if (validate.error) {
        return res.status(400).json({ error: validate?.error?.details });
    }
    return next();
}

export {
    validRequest,
    dataType
}