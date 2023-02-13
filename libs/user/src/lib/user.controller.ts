import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, Role } from '@prisma/client';
import { IUserGateway } from './gateway/gateway';
import { Roles } from '@cineman/authorization';

@Controller('users')
export class UserController implements IUserGateway {
  constructor(private readonly UserService: UserService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.UserService.create(createUserDto);
  }

  @Roles(Role.ADMIN)
  @Get()
  findAll(): Promise<User[]> {
    return this.UserService.findAll({});
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.UserService.findOne({ id });
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.UserService.update({ where: { id }, data: updateUserDto });
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.UserService.remove({ id });
  }
}
