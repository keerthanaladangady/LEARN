import { Router } from "express";
import { sendFailedResponse, sendSuccessResponse } from "../common/common.js";
import { getService } from "../../services/service/index.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await getService(req);
    sendSuccessResponse(res, result.rows);
  } catch (err) {
    console.log(err)
    sendFailedResponse(res, err);
  }
});

export default router;