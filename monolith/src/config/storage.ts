import multer, { StorageEngine } from 'multer';
import envConfig from './env';

interface IStorageConfig {
  driver: 'local' | 'googleCloud';
  url: string;
  tempPath: string;
  multer: {
    storage: StorageEngine;
  };
  local: {
    uploadPath: string;
  };
  googleCloud: {
    projectId: string;
    bucket: string;
    credentials: {
      client_email: string;
      private_key: string;
    };
  };
}

const basePath = envConfig.mode === 'development' ? '../localStorage' : '.';

const storageConfig = {
  driver: process.env.STORAGE_DRIVER,
  url: process.env.STORAGE_URL,
  tempPath: `${basePath}/tmp`,
  multer: {
    storage: multer.memoryStorage(),
  },
  local: {
    uploadPath: `${basePath}/tmp/uploads`,
  },
  googleCloud: {
    projectId: process.env.GCP_PROJECT_ID,
    bucket: process.env.GCS_BUCKET,
    credentials: {
      client_email: process.env.GCP_CLIENT_EMAIL,
      private_key: process.env.GCP_PRIVATE_KEY,
    },
  },
} as IStorageConfig;

export default storageConfig;
