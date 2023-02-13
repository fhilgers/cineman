import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

export { PrismaService };

export { PrismaClientExceptionFilter, PrismaClientUnknownExceptionFilter, PrismaClientValidationExceptionFilter } from './prisma-client-exception.filter';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
