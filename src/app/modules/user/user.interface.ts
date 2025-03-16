export type IUser = {
  id: string;
  password: string;
  needchangePassword: boolean;
  role: 'admin' | 'student' | 'instructor';
  status: 'active' | 'inactive'|"blocked"
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};


export type TUserRole = "student"|"instructor"|"admin"|"superAdmin"



export interface IUserMethods {
  checkUserExistById(id: string): Promise<boolean>;
  comparePassword(
    inputPassword: string,
    storedPassword: string,
  ): Promise<boolean>;
}
