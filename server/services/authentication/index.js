import bcrypt from "bcrypt";
import generateJwt from "../common/tokenGenerator.js";
import pool from "../../db/config.js";
import { ApplicationError } from '../../routes/common/common.js';
import { StatusCodes, StatusMessages } from '../../utils/constants.js';

// Login Function
export const login = async (req) => {
  try {
    let code = req.body.code;
    let users = await pool.query('SELECT * FROM vw_user_master where code= $1', [code]);
    let user = users.rows[0];
    if (!user) {
      throw new ApplicationError(
        StatusCodes.BAD_REQUEST_ERROR_CODE,
        {
            error: `Invalid Code!!`,
        },
        StatusMessages.BAD_REQUEST_MSG
    );
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      return {
        accessToken: generateJwt({
          code: user.code,
          name: user.name,
          email_id: user.email_id,
          mobile: user.mobile,
          gender: user.gender,
          qualification: user.qualification,
          grade: user.grade,
          role_id: user.role_id,
          status: user.status
        }),
      };
    } else {
      throw new ApplicationError(
        StatusCodes.BAD_REQUEST_ERROR_CODE,
        {
            error: `Invalid password`,
        },
        StatusMessages.BAD_REQUEST_MSG
    );
    }
  } catch (error) {
    console.error('Error while login : ', error);
    throw new ApplicationError(
      StatusCodes.SERVER_ERROR_CODE,
      { message: `Error while login : ${error.message}` },
      StatusMessages.SERVER_ERROR_MSG
    );
  }
};