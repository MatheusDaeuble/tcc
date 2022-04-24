import UnenrollUsersJob from '@jobs/UnenrollUsersJob';

export enum SUBSCRIBED_TOPICS {
  DELETE_COURSE = 'delete-course',
}

interface IPubSubConfig {
  privateKey: string;
  projectId: string;
  clientEmail: string;
  subscriptionBaseName: string;
  topics: { name: SUBSCRIBED_TOPICS; Job: unknown }[];
  subscriptions: string[];
}

const pubSubConfig = {
  privateKey: process.env.GCP_PRIVATE_KEY,
  projectId: process.env.GCP_PROJECT_ID,
  clientEmail: process.env.GCP_CLIENT_EMAIL,
  subscriptionBaseName: 'microservice-user',
  topics: [{ name: SUBSCRIBED_TOPICS.DELETE_COURSE, Job: UnenrollUsersJob }],
} as IPubSubConfig;

export default pubSubConfig;
