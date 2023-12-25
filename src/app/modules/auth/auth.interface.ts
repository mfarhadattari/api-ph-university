export interface ILoginUser {
  id: string;
  password: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface IJWTPayload {
  id: string;
  role: 'admin' | 'faculty' | 'student';
}
