import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@cineman/user';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

export { JwtAuthGuard } from './jwt-auth.guard';
export { LocalAuthGuard } from './local-auth.guard';
export { AuthService };

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env['NX_JWT_SECRET'],
      signOptions: { expiresIn: '5m' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
