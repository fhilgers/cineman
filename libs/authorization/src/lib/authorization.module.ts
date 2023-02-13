import { Module } from '@nestjs/common';

import { RolesGuard } from './roles.guard';

export { RolesGuard };
export { Public, IS_PUBLIC_KEY } from './public.decorator';
export { Roles, ROLES_KEY } from './roles.decorator';

@Module({
  controllers: [],
  providers: [RolesGuard],
  exports: [RolesGuard],
})
export class AuthorizationModule {}
