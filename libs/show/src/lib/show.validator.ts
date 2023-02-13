import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ShowService } from './show.service';

export function IsNotOverlappingForTheater(
  endDateProperty: string,
  theaterIdProperty: string,
  validationOptions?: ValidationOptions
) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [endDateProperty, theaterIdProperty],
      validator: NotOverlappingForTheaterRule,
    });
  };
}

@ValidatorConstraint({ name: 'NotOverlappingForTheater', async: true })
@Injectable()
export class NotOverlappingForTheaterRule
  implements ValidatorConstraintInterface
{
  constructor(private readonly showService: ShowService) {}

  async validate(value: string, args: ValidationArguments) {
    const [endDateProperty, theaterIdPropertyName] = args.constraints;

    const endDate = (args.object as unknown)[endDateProperty];
    const theaterId = (args.object as unknown)[theaterIdPropertyName];

    return this.showService
      .findAll({
        where: {
          AND: [
            { theaterId },
            { start: { lt: endDate } },
            { end: { gt: value } },
          ],
        },
      })
      .then((value) => (value.length > 0 ? false : true))
      .catch((e) => {
        console.log(e);
        return false;
      });
  }

  defaultMessage(args: ValidationArguments) {
    const [_, theaterIdPropertyName] = args.constraints;

    const theaterId = (args.object as any)[theaterIdPropertyName];

    return `Show in theater with id ${theaterId} overlaps with another show`;
  }
}

export function IsShow(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: ShowExistsRule,
    });
  };
}

@ValidatorConstraint({ name: 'ShowExists', async: true })
@Injectable()
export class ShowExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly ShowService: ShowService) {}

  async validate(id: string) {
    return this.ShowService.findOne({ id })
      .then(() => true)
      .catch(() => false);
  }

  defaultMessage(args: ValidationArguments) {
    return `Show ${args.value} doesn't exist`;
  }
}
