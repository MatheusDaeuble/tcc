import ICreateUserDTO from './dtos/ICreateUserDTO';
import IUpdateUserDTO from './dtos/IUpdateUserDTO';
import IFilterUsersDTO from './dtos/IFilterUsersDTO';
import User from '../../entities/User';

export default interface IUsersRepository {
  findById(id: number): Promise<User | undefined>;
  deleteById(id: number): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: IUpdateUserDTO): Promise<User>;
  filter(filter: IFilterUsersDTO): Promise<User[]>;
}
