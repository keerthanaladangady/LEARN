
import { addFilter, db } from "../common/common.js";

/**
 * Get Supplier
 * 
 * @param {*} req 
 * @returns 
 */
export const getSupplier = async (req) => {
    try {
        let query = addFilter(req.query, `SELECT * FROM public.vw_supplier_master`);
        return db(query);
    } catch (error) {
        console.error("Error while getting Supplier data : ", error);
        throw error;
    }

};