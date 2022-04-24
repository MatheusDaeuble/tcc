/* eslint-disable max-classes-per-file */
import CoursesRepository from '@modules/courses/database/repositories/CoursesRepository';
import AppError from '@shared/errors/AppError';
import { instanceToInstance } from 'class-transformer';
import { Response, Request } from 'express';
import UsersRepository from '../database/repositories/UsersRepository';

export default class RegistrationController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { userId, courseId } = request.body;

    const usersRepository = new UsersRepository();
    const courseRepository = new CoursesRepository();

    const userFound = await usersRepository.findById(userId);
    if (!userFound) throw new AppError('Usuário não encontrado');

    const courseFound = await courseRepository.findById(courseId);
    if (!courseFound) throw new AppError('Curso não encontrado');

    const user = await usersRepository.save({ ...userFound, courseId });

    return response.json(instanceToInstance(user));
  }
}
