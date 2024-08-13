/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
    .setTitle('Deliver Jokes API')
    .setDescription('API for delivering random jokes')
    .setVersion('1.0')
    .addTag('jokes')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  Logger.log(`Swagger UI available at http://localhost:9090/api`);
  SwaggerModule.setup('api', app, document);
  await app.listen(9090);
}
bootstrap();
