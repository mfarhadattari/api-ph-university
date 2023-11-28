import {
  ISemesterNameAndCodeMapper,
  TMonths,
  TSemesterCode,
  TSemesterName,
} from './academicSemester.interface';

export const semesterName: TSemesterName[] = ['Autumn', 'Summer', 'Fall'];

export const semesterCode: TSemesterCode[] = ['01', '02', '03'];

export const months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const semesterNameAndCodeMapper: ISemesterNameAndCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
