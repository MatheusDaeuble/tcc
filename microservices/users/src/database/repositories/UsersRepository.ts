import { getRepository, ILike, Repository } from 'typeorm';

import User from '../entities/User';
import ICreateUserDTO from './types/dtos/ICreateUserDTO';
import IFilterUsersDTO from './types/dtos/IFilterUsersDTO';
import IUpdateUserDTO from './types/dtos/IUpdateUserDTO';
import IUsersRepository from './types/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: number): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async deleteById(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async unenrollAll(courseId: number): Promise<void> {
    await this.ormRepository.update({ courseId }, { courseId: null });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email: ILike(email) },
    });

    return user;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(data: IUpdateUserDTO): Promise<User> {
    const user = await this.ormRepository.save(data);

    return user;
  }

  public async filter(_: IFilterUsersDTO): Promise<User[]> {
    const data = await this.ormRepository.find();

    return data;
  }
}

export default UsersRepository;
