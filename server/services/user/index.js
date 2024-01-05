
import { addFilter, db } from "../common/common.js";

/**
 * Get User
 * 
 * @param {*} req 
 * @returns 
 */
export const getUser = async (req) => {
    try {
        let query = addFilter(req.query, `SELECT * FROM public.vw_user_master`);
        return db(query);
    } catch (error) {
        console.error("Error while getting User data : ", error);
        throw error;
    }

};