import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

export const config = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  db_uri: process.env.DB_URI,
  client_base_url: process.env.CLIENT_BASE_URL,
  nodemailer_user: process.env.NODEMAILER_USER,
  nodemailer_pass: process.env.NODEMAILER_PASS,
  nodemailer_email: process.env.NODEMAILER_EMAIL,
  default_password: process.env.DEFAULT_PASSWORD,
  supper_admin_email: process.env.SUPPER_ADMIN_EMAIL,
  supper_admin_id: process.env.SUPPER_ADMIN_ID,
  supper_admin_password: process.env.SUPPER_ADMIN_PASS,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_config: {
    algorithm: process.env.JWT_ALGORITHM,
    expiresIn: process.env.JWT_ACCESS_EXPIRE,
  },
  jwt_refresh_config: {
    algorithm: process.env.JWT_ALGORITHM,
    expiresIn: process.env.JWT_REFRESH_EXPIRE,
  },
  cloudinary_config: {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  },
};
