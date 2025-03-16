import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const config = {
  port: process.env.PORT || 3000,
  dbUrl:
    process.env.MONGO_URI ||
    (() => {
      throw new Error('MONGODB_URI is required');
    })(),
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  refresh_token_cookie_expires_in: process.env.REFRESH_TOKEN_COOKIE_EXPIRES_IN,
  defaultPasssword: process.env.DEFAULT_PASSWORD,
  saltRounds: process.env.SALT_ROUNDS,
  envirnment: process.env.ENVIRNMENT,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};
