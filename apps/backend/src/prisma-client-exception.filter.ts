import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    switch (exception.code) {
      default: {
        const status = HttpStatus.CONFLICT;
        response.status(status).json({
          statusCode: status,
          message: message,
        });
        break;
      }
    }
  }
}

@Catch(Prisma.PrismaClientUnknownRequestError)
export class PrismaClientUnknownExceptionFilter extends BaseExceptionFilter {
  catch(
    exception: Prisma.PrismaClientUnknownRequestError,
    host: ArgumentsHost
  ) {
    console.error(exception.message);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    const status = HttpStatus.CONFLICT;
    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}

@Catch(Prisma.PrismaClientValidationError)
export class PrismaClientValidationExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientValidationError, host: ArgumentsHost) {
    console.error(exception.message);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    const status = HttpStatus.CONFLICT;
    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
