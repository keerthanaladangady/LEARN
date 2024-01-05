
import { addFilter, db } from "../common/common.js";
import { ApplicationError } from '../../routes/common/common.js';
import { StatusCodes, StatusMessages } from '../../utils/constants.js';
import bcrypt from "bcrypt";
import pool from "../../db/config.js";


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

/**
* Service to create user 
* 
* @param {*} req 
* @returns 
*/
export const createUser = async (req) => {
  try {
    let code = req.body.code;
    let name = req.body.name;
    let email_id = req.body.email_id;
    let mobile = req.body.mobile;
    let gender = req.body.gender;
    let qualification = req.body.qualification;
    let grade = req.body.grade;
    let role_id = req.body.role_id;
    let status = req.body.status;
    let doj = req.body.doj;
    let dob = req.body.dob;
    let password = await bcrypt.hash(req.body.password, 10);

    let users = await pool.query('SELECT * FROM vw_user_master where code= $1', [code]);
    let user = users.rows[0];

    if (!user) {
      await db({
        query: `INSERT INTO public.user_master(code, name, password,doj,dob, email_id,  mobile, gender, qualification, grade, role_id,status) 
                  VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9,$10,$11,$12) returning code`,
        values: [code,
          name,
          password,
          doj,
          dob,
          email_id,
          mobile,
          gender,
          qualification,
          grade,
          role_id,
          status,
        ]
      });
      return { message: `User Created Successfully with code : ${code}` };
    } else {
      throw new ApplicationError(
        StatusCodes.BAD_REQUEST_ERROR_CODE,
        { message: `User with code already available in our system !!` },
        StatusMessages.BAD_REQUEST_MSG
      );
    }
  } catch (err) {
    console.error('Error wihle creating user : ', err);
    throw new ApplicationError(
      StatusCodes.SERVER_ERROR_CODE,
      { message: `Error while creating user : ${err.message}` },
      StatusMessages.SERVER_ERROR_MSG
    );
  }
}