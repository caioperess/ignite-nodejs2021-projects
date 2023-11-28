import { ManipulateType } from 'dayjs';

export interface IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number;
  compareInDays(startDate: Date, endDate: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
  addTime(time: number, unit: ManipulateType): Date;
  compareIfBefore(startDate: Date, endDate: Date): boolean;
}
