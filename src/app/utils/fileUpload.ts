/* eslint-disable no-console */
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { config } from '../config';

// --------------->> Upload file by multer <<-------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), '/upload/'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname);
  },
});

export const upload = multer({ storage: storage });

// --------------->> Upload In Cloudinary <<-------------------

cloudinary.config(config.cloudinary_config);

export const uploadImageIntoCloudinary = (imageName: string, path: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result);
        // delete file after upload completes
        fs.unlink(path, (err) => {
          if (err) {
            console.log(err);
          }
          console.log(`File deleted successfully`);
        });
      },
    );
  });
};
