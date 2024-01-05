import { Router } from "express";
import { sendErrorResponse, sendFailedResponse, sendSuccessResponse } from "../common/common.js";
import { validRequest, dataType } from "../../middleware/validate.middleware.js";
import { createSupplier, getSupplier } from "../../services/supplier/index.js";
import { schema } from "./supplier.validation.js";


const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await getSupplier(req);
    sendSuccessResponse(res, result.rows);
  } catch (err) {
    console.log(err);
    sendFailedResponse(res, err);
  }
});

router.post("/", validRequest.bind(this, { schema: schema.CREATE_SUPPLIER, dataType: dataType.BODY }), async (req, res) => {
  try {
    const result = await createSupplier(req);
    return sendSuccessResponse(res, result);
  } catch (err) {
    return sendErrorResponse(res, err, err.status, err.statusMessage);
  }
});

export default router;