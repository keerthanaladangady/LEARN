'use strict';

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