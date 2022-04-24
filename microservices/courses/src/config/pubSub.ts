export enum PUBLISHABLE_TOPICS {
  DELETE_COURSE = 'delete-course',
}

interface IPubSubConfig {
  privateKey: string;
  projectId: string;
  clientEmail: string;
}

const pubSubConfig = {
  privateKey: process.env.GCP_PRIVATE_KEY,
  projectId: process.env.GCP_PROJECT_ID,
  clientEmail: process.env.GCP_CLIENT_EMAIL,
} as IPubSubConfig;

export default pubSubConfig;
