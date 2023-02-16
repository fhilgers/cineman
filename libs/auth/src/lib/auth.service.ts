import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@cineman/user';
import { Role, User } from '@prisma/client';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({ username });
    if (bcrypt.compareSync(pass, user.hash)) {
      const { hash, ...result } = user;
      return result;
    }
    return null;
  }

  async register(body) {
    const { username, password, name, address } = body;

    const hash = await bcrypt.hash(password, 10);

    return this.userService.create({
      username,
      hash,
      roles: [Role.USER],
      customer: {
        create: { name, address },
      },
    });
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async refresh(token: string) {
    const decoded = this.jwtService.decode(token) as {
      username: string;
      sub: string;
      roles: Role[];
    };
    const { username, sub, roles } = decoded;
    if (!decoded) throw new Error();

    const user = await this.userService.findOne({ id: decoded.sub });
    if (!user)
      throw new HttpException(
        'user with id does not exist',
        HttpStatus.NOT_FOUND
      );

    return this.jwtService
      .verifyAsync(token)
      .then(() => {
        return { access_token: this.jwtService.sign({ username, sub, roles }) };
      })
      .catch((e) => new UnauthorizedException(e));
  }
}
