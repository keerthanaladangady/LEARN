import { Router } from "express";
import { sendFailedResponse, sendSuccessResponse } from "../common/common.js";
import { getMaintenance } from "../../services/maintenance/index.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await getMaintenance(req);
    sendSuccessResponse(res, result.rows);
  } catch (err) {
    console.log(err)
    sendFailedResponse(res, err);
  }
});

export default router;