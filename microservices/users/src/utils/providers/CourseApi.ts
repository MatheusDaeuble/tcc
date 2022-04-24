import axios, { AxiosInstance } from 'axios';

import courseApiConfig from '@config/courseApi';
import AppError from '@utils/errors/AppError';

interface ICourse {
  id: number;
  name: string;
  professorName: string;
  workload: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

class CourseApi {
  private courseApi: AxiosInstance;

  constructor() {
    this.courseApi = axios.create({ baseURL: `${courseApiConfig.url}` });
  }

  public async show(id: string): Promise<ICourse> {
    try {
      const { data } = await this.courseApi.get<ICourse>(`/${id}`);
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new AppError(error.response.data.message);
      }
      throw error;
    }
  }
}

export default CourseApi;
