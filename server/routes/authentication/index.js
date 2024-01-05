import { Router } from "express";
import { sendFailedResponse, sendSuccessResponse } from "../common/common.js";
import { login } from "../../services/authentication/index.js";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const result = await login(req);
    sendSuccessResponse(res, result);
  } catch (err) {
    sendFailedResponse(res, err);
  }
});

export default router;