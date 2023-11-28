export type TSemesterName = 'Autumn' | 'Summer' | 'Fall';

export type TSemesterCode = '01' | '02' | '03';

export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export interface IAcademicSemester {
  name: TSemesterName;
  code: TSemesterCode;
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
}

export interface ISemesterNameAndCodeMapper {
  [key: string]: string;
}
