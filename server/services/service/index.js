
import { addFilter, db } from "../common/common.js";

/**
 * Get Service
 * 
 * @param {*} req 
 * @returns 
 */
export const getService = async (req) => {
    try {
        let query = addFilter(req.query, `SELECT * FROM public.vw_service`);
        return db(query);
    } catch (error) {
        console.error("Error while getting service data : ", error);
        throw error;
    }

};