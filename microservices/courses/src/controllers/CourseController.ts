/* eslint-disable max-classes-per-file */
import { Response, Request } from 'express';
import { instanceToInstance } from 'class-transformer';
import AppError from '@utils/errors/AppError';
import googlePubSubProvider from '@utils/providers/GooglePubSubProvider';
import { PUBLISHABLE_TOPICS } from '@config/pubSub';
import CoursesRepository from '../database/repositories/CoursesRepository';

export default class CourseController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, professorName, workload, startDate, endDate } = request.body;

    const coursesRepository = new CoursesRepository();

    const course = await coursesRepository.create({
      name,
      professorName,
      workload,
      startDate,
      endDate,
    });

    return response.json(instanceToInstance(course));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const coursesRepository = new CoursesRepository();

    const course = await coursesRepository.findById(Number(id));

    if (!course) throw new AppError('Curso não encontrado');

    return response.json(instanceToInstance(course));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const coursesRepository = new CoursesRepository();

    const courses = await coursesRepository.filter({});

    return response.json(courses.map(course => instanceToInstance(course)));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, professorName, workload, startDate, endDate } = request.body;
    const id = Number(request.params.id);

    const coursesRepository = new CoursesRepository();

    const courseFound = await coursesRepository.findById(id);

    if (!courseFound) throw new AppError('Curso não encontrado.');

    const course = await coursesRepository.save({
      id,
      name,
      professorName,
      workload,
      startDate,
      endDate,
    });

    return response.json(instanceToInstance(course));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const coursesRepository = new CoursesRepository();

    const course = await coursesRepository.findById(Number(id));

    if (!course) throw new AppError('Curso não encontrado');

    await coursesRepository.deleteById(course.id);

    await googlePubSubProvider.publish({
      topic: PUBLISHABLE_TOPICS.DELETE_COURSE,
      message: { id },
    });

    return response.status(204).json();
  }
}
