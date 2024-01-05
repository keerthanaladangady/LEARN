import  pgPromise from 'pg-promise';
const pgp =  pgPromise();

import dotenv from "dotenv";
dotenv.config();
export default   pgp(process.env.NODE_ENV === "DEV"? process.env.DATABASE_URL_DEV: process.env.DATABASE_URL_PROD);