import bcrypt from "bcrypt";
// import { db } from "../common/common.js";
import generateJwt from "../common/tokenGenerator.js";
import pool from "../../db/config.js";

// Login Function
export const login = async (req) => {
  let code = req.query.code;
  let users = await pool.query('SELECT * FROM vw_user_master where code= $1', [code])
  let user = users.rows[0];
  if (!user) {
    throw "Invalid Code!!";
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
    throw "Invalid password!!";
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
    let status = req.body.status; //boolean
    let doj = req.body.doj;
    let dob = req.body.dob;
    let password = await bcrypt.hash(req.body.password, 10);

    let users = await pool.query('SELECT user_id FROM vw_user_master where code= $1', [code]);
    let user = users.rows[0];

    if (!user) {
      let user_id = await db({
        query: `INSERT INTO public.user_master(code, name, password,doj,dob, email_id,  mobile, gender, qualification, grade, role_id,status) 
                VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9,$10,$11,$12) returning user_id`,
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
          status, //boolean
        ]
      });
    } else {

    }
    return { message: "User Registered Successfully. You can Sign in now." };
  } catch (err) {
    console.error('Error while creating user : ', err);
    throw err;
  }


}