/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import { config } from './config';

let server: Server;

// -------->> bootstrap server function <<----------------
const bootstrap = async () => {
  try {
    // listing app
    server = app.listen(config.port, () => {
      console.log(`[Server] listening on port ${config.port}`);
    });

    //   connecting database
    await mongoose.connect(config.db_uri as string);
  } catch (error) {
    console.dir(error);
  }
};

bootstrap();

// --------->> Handling Unhandled Rejection Errors <<--------------
process.on('unhandledRejection', () => {
  console.log(`🤖 Unhandled Rejection is detected, shutting down...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

// --------->> Handling Uncaught Exception Errors <<--------------
process.on('uncaughtException', () => {
  console.log(`🤖 Uncaught Exception is detected, shutting down...`);
  process.exit();
});
