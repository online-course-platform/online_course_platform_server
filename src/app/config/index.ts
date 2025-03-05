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
  defaultPasssword: process.env.DEFAULT_PASSWORD,
  saltRounds: process.env.SALT_ROUNDS,
  // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  // api_key: process.env.CLOUDINARY_API_KEY,
  // api_secret: process.env.CLOUDINARY_API_SECRET,
};
