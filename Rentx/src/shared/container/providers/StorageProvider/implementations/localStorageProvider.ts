import fs from 'node:fs';
import { resolve } from 'node:path';

import { uploadConfig } from '@config/upload';

import { IStorageProvider } from '../IStorageProvider';

export class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await fs.promises.mkdir(resolve(uploadConfig.tmpFolder, folder), {
      recursive: true,
    });

    await fs.promises.rename(
      resolve(uploadConfig.tmpFolder, file),
      resolve(uploadConfig.tmpFolder, folder, file),
    );

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(uploadConfig.tmpFolder, folder, file);

    try {
      await fs.promises.stat(filename);
    } catch (err) {
      return;
    }

    await fs.promises.unlink(filename);
  }
}
