import pubSubConfig, { PUBLISHABLE_TOPICS } from '@config/pubSub';
import { PubSub } from '@google-cloud/pubsub';
import { ObjectLiteral } from 'typeorm';

interface IEventPublish {
  topic: PUBLISHABLE_TOPICS.DELETE_COURSE;
  message: ObjectLiteral;
}

class GooglePubSubProvider {
  private client: PubSub;

  constructor() {
    this.client = new PubSub({
      projectId: pubSubConfig.projectId,
      credentials: {
        private_key: pubSubConfig.privateKey,
        client_email: pubSubConfig.clientEmail,
      },
    });
  }

  public async publish({ topic, message }: IEventPublish): Promise<void> {
    const dataBuffer = Buffer.from(JSON.stringify(message));
    await this.client.topic(topic).publishMessage({ data: dataBuffer });
  }
}

export default new GooglePubSubProvider();
