import { ISchedule } from './offeredCourse.interface';

export const hasTimeConflict = (
  previousSchedules: ISchedule[],
  newSchedule: ISchedule,
) => {
  for (const schedule of previousSchedules) {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}:00`);
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}:00`);
    const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}:00`);
    const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}:00`);
    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
  }
  return false;
};
