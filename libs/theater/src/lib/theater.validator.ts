import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { TheaterService } from './theater.service';

export function IsTheater(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: TheaterExistsRule,
    });
  };
}

@ValidatorConstraint({ name: 'TheaterExists', async: true })
@Injectable()
export class TheaterExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly theaterService: TheaterService) {}

  async validate(id: string) {
    return this.theaterService
      .findOne({ id })
      .then(() => true)
      .catch(() => false);
  }

  defaultMessage(args: ValidationArguments) {
    return `Theater ${args.value} doesn't exist`;
  }
}

export function IsUniqueTheaterName(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UniqueTheaterNameRule,
    });
  };
}

@ValidatorConstraint({ name: 'UniqueTheaterName', async: true })
@Injectable()
export class UniqueTheaterNameRule implements ValidatorConstraintInterface {
  constructor(private readonly theaterService: TheaterService) {}

  async validate(name: string) {
    return this.theaterService
      .findOne({ name })
      .then(() => false)
      .catch(() => true);
  }

  defaultMessage(args: ValidationArguments) {
    return `Theater with name ${args.value} already exists`;
  }
}
