
import { addFilter, db } from "../common/common.js";

/**
 * Get Maintenance
 * @param {*} req 
 * @returns 
 */
export const getMaintenance = async (req) => {
    try {
        let query = addFilter(req.query, `SELECT * FROM public.vw_maintenance`);
        return db(query);
    } catch (error) {
        console.error("Error while getting Maintenance data : ", error);
        throw error;
    }

};