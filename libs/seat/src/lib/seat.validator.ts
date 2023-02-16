import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { SeatService } from './seat.service';

export function IsSeatUniqueForTheater(
  theaterIdProperty: string,
  validationOptions?: ValidationOptions
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [theaterIdProperty],
      validator: UniqueNumberForTheaterRule,
    });
  };
}

@ValidatorConstraint({ name: 'UniqueNumberForTheater', async: true })
@Injectable()
export class UniqueNumberForTheaterRule
  implements ValidatorConstraintInterface
{
  constructor(private readonly seatService: SeatService) {}

  async validate(value: number, args: ValidationArguments) {
    const [theaterIdPropertyName] = args.constraints;
    const theaterId = (args.object as any)[theaterIdPropertyName];

    return this.seatService
      .findOne({ number_theaterId: { number: value, theaterId } })
      .then(() => false)
      .catch(() => true);
  }

  defaultMessage(args: ValidationArguments) {
    const [theaterIdPropertyName] = args.constraints;
    const theaterId = (args.object as any)[theaterIdPropertyName];

    return `Seat with number ${args.value} already exists for theater with id ${theaterId}`;
  }
}

export function IsSeat(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: SeatExistsRule,
    });
  };
}

@ValidatorConstraint({ name: 'SeatExists', async: true })
@Injectable()
export class SeatExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly SeatService: SeatService) {}

  async validate(id: string) {
    return this.SeatService.findOne({ id })
      .then(() => true)
      .catch(() => false);
  }

  defaultMessage(args: ValidationArguments) {
    return `Seat ${args.value} doesn't exist`;
  }
}
