
import { addFilter, db } from "../common/common.js";

/**
 * Get Process
 * 
 * @param {*} req 
 * @returns 
 */
export const getProcess = async (req) => {
    try {
        let query = addFilter(req.query, `SELECT * FROM public.vw_process`);
        return db(query);
    } catch (error) {
        console.error("Error while getting process data : ", error);
        throw error;
    }

};