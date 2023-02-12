/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';

import { AppModule } from './app/app.module';
import { PrismaClientExceptionFilter, PrismaClientUnknownExceptionFilter, PrismaClientValidationExceptionFilter } from './prisma-client-exception.filter';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const globalPrefix = '';
  app.setGlobalPrefix(globalPrefix);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter), new PrismaClientUnknownExceptionFilter(httpAdapter), new PrismaClientValidationExceptionFilter(httpAdapter))

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
