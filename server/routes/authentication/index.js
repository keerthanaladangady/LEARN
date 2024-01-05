import { Router } from "express";
import { sendFailedResponse, sendSuccessResponse } from "../common/common.js";
import { login, createUser } from "../../services/authentication/index.js";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const result = await login(req);
    sendSuccessResponse(res, result);
  } catch (err) {
    sendFailedResponse(res, err);
  }
});

router.post("/create_user", async (req, res) => {
  try {
    const result = await createUser(req);
    sendSuccessResponse(res, result);
  } catch (err) {
    sendFailedResponse(res, err);
  }
});

export default router;