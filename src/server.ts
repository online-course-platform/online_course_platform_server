import mongoose from 'mongoose';
import { config } from './app/config';
import app from './app/app';

async function main() {
  try {
    await mongoose.connect(config.dbUrl);

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error(error);
  }
}
main();
