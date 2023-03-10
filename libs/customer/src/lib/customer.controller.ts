import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateSeatDto } from './dto/create-customer.dto';
import { UpdateSeatDto } from './dto/update-customer.dto';
import { Customer } from '@prisma/client';
import { ICustomerGateway } from './gateway/gateway';

@Controller('customers')
export class CustomerController implements ICustomerGateway {
  constructor(private readonly CustomerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateSeatDto): Promise<Customer> {
    return this.CustomerService.create(createCustomerDto);
  }

  @Get()
  findAll(@Query('userId') userId?: string): Promise<Customer[]> {
    return this.CustomerService.findAll({ where: { userId } });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Customer> {
    return this.CustomerService.findOne({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateSeatDto
  ): Promise<Customer> {
    return this.CustomerService.update({
      where: { id },
      data: updateCustomerDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Customer> {
    return this.CustomerService.remove({ id });
  }
}
