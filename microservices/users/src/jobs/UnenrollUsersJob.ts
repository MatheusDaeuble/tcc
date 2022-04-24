import UsersRepository from '@database/repositories/UsersRepository';

export default class UnenrollUsersJob {
  public async execute({ id }: { id: number }): Promise<void> {
    const usersRepository = new UsersRepository();
    await usersRepository.unenrollAll(id);
  }
}
