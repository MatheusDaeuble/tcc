/* eslint-disable max-classes-per-file */
import handlebars from 'handlebars';
import pdf from 'html-pdf';
import { Response, Request } from 'express';
import { readFileSync } from 'fs';
import AppError from '@utils/errors/AppError';
import { formatDate } from '@utils/format';

const [template, config] = readFileSync('./src/views/certificate.hbs', {
  encoding: 'utf-8',
}).split('@pdfConfig');

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      fullName,
      courseName,
      issuedAt,
      startDate,
      endDate,
      workload,
    } = request.body;

    const parseTemplate = handlebars.compile(template);

    const createPDF = (): Promise<Buffer> =>
      new Promise(resolve => {
        pdf
          .create(
            parseTemplate({
              fullName,
              courseName,
              workload,
              issuedAt: formatDate(issuedAt),
              startDate: formatDate(startDate),
              endDate: formatDate(endDate),
            }),
            JSON.parse(config)
          )
          .toBuffer((err, buffer) => {
            if (err !== null)
              throw new AppError('Ocorreu um problema ao gerar o PDF');
            else resolve(buffer);
          });
      });

    await createPDF();

    return response.status(200).json();
  }
}
