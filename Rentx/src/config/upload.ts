import crypto from 'crypto';
import multer from 'multer';
import { resolve } from 'node:path';

export const uploadConfig = {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'tmp', folder),
        filename(req, file, callback) {
          const fileHash = crypto.randomBytes(10).toString('hex');
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    };
  },
};
