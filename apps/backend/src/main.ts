/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = '';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({whitelist: true, enableDebugMessages: true, transform: true}));
  app.enableCors();
  const port = process.env.PORT || 3333;
  
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  Logger.log(
    `Database is running on: ${process.env.DATABASE_URL}`
  )
}

bootstrap();
