import AppError from '@shared/errors/AppError';
import { hashPassword } from '@shared/utils/crypto';
import { instanceToInstance } from 'class-transformer';
import { Response, Request } from 'express';
import UsersRepository from '../database/repositories/UsersRepository';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      fullName,
      email,
      password,
      phone,
      birthDate,
      gender,
    } = request.body;

    const usersRepository = new UsersRepository();

    const userFound = await usersRepository.findByEmail(email);

    if (userFound) throw new AppError('Esse e-mail já está em uso.');

    const user = await usersRepository.create({
      fullName,
      email,
      password: hashPassword(password),
      phone,
      birthDate,
      gender,
    });

    return response.json(instanceToInstance(user));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(Number(id));

    if (!user) throw new AppError('Usuário não encontrado');

    return response.json(instanceToInstance(user));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();

    const users = await usersRepository.filter({});

    return response.json(users.map(user => instanceToInstance(user)));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { fullName, phone, birthDate, gender } = request.body;
    const id = Number(request.params.id);

    const usersRepository = new UsersRepository();

    const userFound = await usersRepository.findById(id);

    if (!userFound) throw new AppError('Usuário não encontrado.');

    const user = await usersRepository.save({
      id,
      fullName,
      phone,
      birthDate,
      gender,
    });

    return response.json(instanceToInstance(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(Number(id));

    if (!user) throw new AppError('Usuário não encontrado');

    await usersRepository.deleteById(user.id);

    return response.status(204).json();
  }
}
