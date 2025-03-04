export type IUser = {
  id: string;
  password: string;
  needchangePassword: boolean;
  role: 'admin' | 'student' | 'instructor';
  status: 'active' | 'inactive';
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};
