import { Router } from "express";
import { sendFailedResponse, sendErrorResponse, sendSuccessResponse } from "../common/common.js";
import { validRequest, dataType } from "../../middleware/validate.middleware.js";
import { getUser, createUser } from "../../services/user/index.js";
import { schema } from "./user.validation.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await getUser(req);
    sendSuccessResponse(res, result.rows);
  } catch (err) {
    console.log(err)
    sendFailedResponse(res, err);
  }
});

router.post("/", validRequest.bind(this, { schema: schema.CREATE_USER, dataType: dataType.BODY }),  async (req, res) => {
  try {
      const result = await createUser(req);
      return sendSuccessResponse(res, result);
  } catch (err) {
      return sendErrorResponse(res, err, err.status, err.statusMessage);
  }
});

export default router;