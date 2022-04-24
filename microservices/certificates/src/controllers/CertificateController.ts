/* eslint-disable max-classes-per-file */
import handlebars from 'handlebars';
import pdf from 'html-pdf';
import { Response, Request } from 'express';
import { readFileSync } from 'fs';
import AppError from '@utils/errors/AppError';

const [template, config] = readFileSync('./src/views/certificate.hbs', {
  encoding: 'utf-8',
}).split('@pdfConfig');

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { fullName } = request.body;

    const parseTemplate = handlebars.compile(template);

    const createPDF = (): Promise<Buffer> =>
      new Promise(resolve => {
        pdf
          .create(
            parseTemplate({ fullName, issuedAt: '25/03/2022' }),
            JSON.parse(config)
          )
          .toBuffer((err, buffer) => {
            if (err !== null)
              throw new AppError('Ocorreu um problema ao gerar o PDF');
            else resolve(buffer);
          });
      });

    // const buffer = await createPDF();

    await createPDF();

    return response.status(200).json();

    // return response
    //   .writeHead(200, {
    //     'Content-Length': Buffer.byteLength(buffer),
    //     'Content-Type': 'application/pdf',
    //     'Content-disposition': `attachment;filename=Certificado ${fullName}.pdf`,
    //   })
    //   .end(buffer);
  }
}
