export interface Customer {
  id: number|null;
  login: string|null;
  password: string|null;
  rePassword: string|null;
  createdDate: Date|null;
  profileUrl: string|null;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  sex: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
}
