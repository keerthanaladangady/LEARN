
import { addFilter, db } from "../common/common.js";
import { ApplicationError } from '../../routes/common/common.js';
import { StatusCodes, StatusMessages } from '../../utils/constants.js';

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

export const createSupplier = async (req) => {
    try {
        const code = req.body.code;
        const name = req.body.name;

        let suppliers = await pool.query('SELECT * FROM vw_supplier_master where code= $1', [code]);
        let supplier = suppliers.rows[0];

        if (!supplier) {
            await db({
                query: `INSERT INTO public.supplier_master(code, name) 
                      VALUES ($1, $2) returning code`,
                values: [code, name]
            });
            return { message: "Supplier added sucessfully !!" }
        } else {
            throw new ApplicationError(
                StatusCodes.BAD_REQUEST_ERROR_CODE,
                { message: `Supplier with code already available in our system !!` },
                StatusMessages.BAD_REQUEST_MSG
            );
        }
    } catch (error) {
        console.error('Error wihle creating supplier : ', err);
        throw new ApplicationError(
            StatusCodes.SERVER_ERROR_CODE,
            { message: `Error while creating supplier : ${err.message}` },
            StatusMessages.SERVER_ERROR_MSG
        );
    }
}