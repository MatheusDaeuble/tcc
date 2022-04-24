// import pubSubConfig from '@config/pubSub';
// import { PubSub } from '@google-cloud/pubsub';

// class GooglePubSubProvider {
//   private client: PubSub;

//   private basePath = `projects/${pubSubConfig.projectId}`;

//   constructor() {
//     this.client = new PubSub({
//       projectId: pubSubConfig.projectId,
//       credentials: {
//         private_key: pubSubConfig.privateKey,
//         client_email: pubSubConfig.clientEmail,
//       },
//     });
//     this.listenMessages();
//   }

//   private async listenMessages(): Promise<void> {
//     pubSubConfig.topics.forEach(({ name, Job }) => {
//       const subscription = this.client
//         .topic(this.getTopicName(name))
//         .subscription(this.getSubscriptionName(name));

//       subscription.on('message', message => {
//         const job = new Job();
//         job.execute(JSON.parse(message.data.toString())).then(() => {
//           message.ack();
//         });
//       });
//     });
//   }

//   private getTopicName(topic: string): string {
//     return `${this.basePath}/topics/${topic}`;
//   }

//   private getSubscriptionName(topic: string): string {
//     return `${this.basePath}/subscriptions/${pubSubConfig.subscriptionBaseName}.${topic}`;
//   }
// }

// export default new GooglePubSubProvider();
