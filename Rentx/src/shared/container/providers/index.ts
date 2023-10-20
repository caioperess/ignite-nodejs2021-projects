import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider/IDateProvider';
import { DayJsDateProvider } from './implementations/dayJsDateProvider';

container.registerSingleton<IDateProvider>('DateProvider', DayJsDateProvider);
