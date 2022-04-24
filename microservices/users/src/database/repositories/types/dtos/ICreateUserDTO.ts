import { GENDERS } from '../enums/genders';

export default interface ICreateUserDTO {
  email: string;
  fullName: string;
  phone: string;
  password: string;
  birthDate: string;
  gender: GENDERS;
}
