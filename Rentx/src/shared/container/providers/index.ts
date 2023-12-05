import { IStorageProviders } from 'constants/IStorageProvider';
import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider/IDateProvider';
import { DayJsDateProvider } from './DateProvider/implementations/dayJsDateProvider';
import { IMailProvider } from './MailProvider/IMailProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';
import { LocalStorageProvider } from './StorageProvider/implementations/localStorageProvider';
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider';
import { IStorageProvider } from './StorageProvider/IStorageProvider';

container.registerSingleton<IDateProvider>('DateProvider', DayJsDateProvider);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);

const storageProvider: IStorageProviders = {
  disk: LocalStorageProvider,
  S3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  storageProvider[process.env.STORAGE],
);
