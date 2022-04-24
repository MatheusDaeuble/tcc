import { getRepository, Repository } from 'typeorm';

import Course from '../entities/Course';
import ICreateCourseDTO from './types/dtos/ICreateCourseDTO';
import IFilterCoursesDTO from './types/dtos/IFilterCoursesDTO';
import IUpdateCourseDTO from './types/dtos/IUpdateCourseDTO';
import ICoursesRepository from './types/ICoursesRepository';

class CoursesRepository implements ICoursesRepository {
  private ormRepository: Repository<Course>;

  constructor() {
    this.ormRepository = getRepository(Course);
  }

  public async findById(id: number): Promise<Course | undefined> {
    const course = await this.ormRepository.findOne(id);

    return course;
  }

  public async deleteById(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async create(data: ICreateCourseDTO): Promise<Course> {
    const course = this.ormRepository.create(data);

    await this.ormRepository.save(course);

    return course;
  }

  public async save(data: IUpdateCourseDTO): Promise<Course> {
    const course = await this.ormRepository.save(data);

    return course;
  }

  public async filter(_: IFilterCoursesDTO): Promise<Course[]> {
    const data = await this.ormRepository.find();

    return data;
  }
}

export default CoursesRepository;
