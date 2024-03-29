/* eslint-disable @typescript-eslint/naming-convention */
declare namespace Express {
  export interface Request {
    user: {
      id: number;
      roles: string[];
    };
    eventManager: {
      warning(message: string): void;
    };
  }
}
