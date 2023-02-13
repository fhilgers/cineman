import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CustomerService } from './customer.service';

export function IsCustomer(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CustomerExistsRule,
    });
  };
}

@ValidatorConstraint({ name: 'CustomerExists', async: true })
@Injectable()
export class CustomerExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly CustomerService: CustomerService) {}

  async validate(id: string) {
    return this.CustomerService.findOne({ id })
      .then(() => true)
      .catch(() => false);
  }

  defaultMessage(args: ValidationArguments) {
    return `Customer ${args.value} doesn't exist`;
  }
}
