import { IStorageProviderTypes } from 'constants/IStorageProvider';

/* eslint-disable @typescript-eslint/naming-convention */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_URL: string;
      AWS_KEY: string;
      TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      AWS_BUCKET: string;
      AWS_BUCKET_REGION: string;
      STORAGE: IStorageProviderTypes;
    }
  }
}

export default {};
