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
};
