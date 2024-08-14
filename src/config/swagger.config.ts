// src/config/swagger.config.ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Logger } from '@nestjs/common';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Jokes API')
    .setDescription('API for managing jokes')
    .setVersion('1.0')
    .addTag('jokes')
    .build();

  Logger.log(
    `Swagger url: ${process.env.NEXT_PUBLIC_DELIVER_SERVICE}/api/docs`
  );
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
}
