import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ["localhost:9092"]
      },
      consumer: {
        groupId: "payment-process-group"
      }
    }
  });

  await app.listen();
  Logger.log(
    `🚀 Application is running as consumer to listern kafka:9092`
  );
}

bootstrap();
