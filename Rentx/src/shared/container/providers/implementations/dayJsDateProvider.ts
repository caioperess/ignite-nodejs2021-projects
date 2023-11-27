import dayjs, { ManipulateType } from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../DateProvider/IDateProvider';

dayjs.extend(utc);

export class DayJsDateProvider implements IDateProvider {
  dateNow(): Date {
    return dayjs().toDate();
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  compareInHours(startDate: Date, endDate: Date): number {
    const endDateUTC = this.convertToUTC(endDate);
    const startDateUTC = this.convertToUTC(startDate);

    return dayjs(endDateUTC).diff(startDateUTC, 'hours');
  }

  compareInDays(startDate: Date, endDate: Date): number {
    const endDateUTC = this.convertToUTC(endDate);
    const startDateUTC = this.convertToUTC(startDate);

    return dayjs(endDateUTC).diff(startDateUTC, 'days');
  }

  addTime(days: number, unit: ManipulateType): Date {
    return dayjs().add(days, unit).toDate();
  }
}
