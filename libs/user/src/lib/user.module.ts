import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from '@cineman/prisma';
import { UserController } from './user.controller';

export { UserService };

@Module({
  imports: [PrismaModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
