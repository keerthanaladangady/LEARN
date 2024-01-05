'use strict';

import { StatusMessages, StatusCodes } from '../../utils/constants.js';

export const sendSuccessResponse = async (res, data) => {
  res.status(200);
  res.setHeader("Content-Type", "application/json");
  res.json(data);
  return res.end();
};

export const sendFailedResponse = (res, err) => {
  res.status(500);
  res.setHeader("Content-Type", "application/json");
  res.json(err?.message || err);
  res.end();
}; 

/**
 * Send Error Response function to return standard error response
 * 
 * @param {*} res 
 * @param {*} err 
 * @param {*} errorCode 
 * @param {*} statusMsg 
 * @returns 
 */
export const sendErrorResponse = async (
  res,
  err,
  errorCode,
  statusMsg,
) => {
  const err_response = {
    status: StatusMessages.ERROR_MSG,
    code: StatusCodes.SERVER_ERROR_CODE,
    statusMessage: StatusMessages.SERVER_ERROR_MSG,
    data: null,
    name: StatusMessages.APP_ERROR,
  };

  if (errorCode) {
    err_response.code = errorCode;
  }

  if (err.data) {
    err_response.data = err.data;
  }
  if (statusMsg) {
    err_response.statusMessage = statusMsg;
  }

  console.error(err_response);
  res.setHeader("Content-Type", "application/json");
  return res.status(err_response.code).json(err_response);
};


/**
 * Generic Applciation Error class for error handling 
 * 
 */
export class ApplicationError extends Error {
  constructor(status, data, statusMessage) {
    super();
    this.status = status;
    this.data = data;
    this.statusMessage = statusMessage;
  }
}
