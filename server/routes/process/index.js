import { Router } from "express";
import { sendFailedResponse, sendSuccessResponse } from "../common/common.js";
import { getProcess } from "../../services/process/index.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await getProcess(req);
    sendSuccessResponse(res, result.rows);
  } catch (err) {
    console.log(err)
    sendFailedResponse(res, err);
  }
});

export default router;