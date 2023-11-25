import mongoose from 'mongoose';
import app from './app';
import { config } from './config';

// -------->> bootstrap server function <<----------------
const bootstrap = async () => {
  try {
    // listing app
    app.listen(config.port, () => {
      console.log(`[Server] listening on port ${config.port}`);
    });

    //   connecting database
    await mongoose.connect(config.db_uri as string);
  } catch (error) {
    console.dir(error);
  }
};

bootstrap();
