import { NestFactory } from '@nestjs/core';

import helmet from 'helmet';
import serverlessExpress from '@vendia/serverless-express';
import { AppModule } from './app.module';
import { Callback, Context, Handler } from 'aws-lambda';

const port = process.env.PORT || 4000;
let cachedServer: Handler;

async function bootstrap() {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      origin: (req, callback) => callback(null, true),
    });
    app.use(helmet());

    await app.init();

    const expressApp = app.getHttpAdapter().getInstance();
    cachedServer = serverlessExpress({ app: expressApp });
  }
  return cachedServer;
}

export const handler: Handler = async (
    event: any,
    context: Context,
    callback: Callback,
) => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  console.log(`Context: ${JSON.stringify(context, null, 2)}`);
  cachedServer = cachedServer ?? (await bootstrap());
  return cachedServer(event, context, callback);
};
