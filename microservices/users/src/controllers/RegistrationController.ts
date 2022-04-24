/* eslint-disable max-classes-per-file */
import AppError from '@utils/errors/AppError';
import CourseApi from '@utils/providers/CourseApi';
import { instanceToInstance } from 'class-transformer';
import { Response, Request } from 'express';
import UsersRepository from '../database/repositories/UsersRepository';

export default class RegistrationController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { userId, courseId } = request.body;

    const courseApi = new CourseApi();
    const usersRepository = new UsersRepository();

    const course = await courseApi.show(courseId);

    const user = await usersRepository.findById(userId);

    if (!user) throw new AppError('Usuário não encontrado');

    user.courseId = course.id;

    await usersRepository.save(user);

    return response.json(instanceToInstance(user));
  }
}
