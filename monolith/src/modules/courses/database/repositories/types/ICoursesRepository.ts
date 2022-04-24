import ICreateCourseDTO from './dtos/ICreateCourseDTO';
import IUpdateCourseDTO from './dtos/IUpdateCourseDTO';
import IFilterCoursesDTO from './dtos/IFilterCoursesDTO';
import Course from '../../entities/Course';

export default interface ICoursesRepository {
  findById(id: number): Promise<Course | undefined>;
  deleteById(id: number): Promise<void>;
  create(data: ICreateCourseDTO): Promise<Course>;
  save(Course: IUpdateCourseDTO): Promise<Course>;
  filter(filter: IFilterCoursesDTO): Promise<Course[]>;
}
