import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RatingService } from './rating.service';

export function IsMovieRatingUniqueForCustomer(
  customerIdProperty: string,
  validationOptions?: ValidationOptions
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [customerIdProperty],
      validator: UniqueMovieRatingForCustomerRule,
    });
  };
}

@ValidatorConstraint({ name: 'UniqueMovieRatingForCustomer', async: true })
@Injectable()
export class UniqueMovieRatingForCustomerRule
  implements ValidatorConstraintInterface
{
  constructor(private readonly ratingService: RatingService) {}

  async validate(value: string, args: ValidationArguments) {
    const [customerIdProperty] = args.constraints;
    const customerId = (args.object as any)[customerIdProperty];

    return this.ratingService
      .findOne({ customerId_movieId: { movieId: value, customerId } })
      .then(() => false)
      .catch(() => true);
  }

  defaultMessage(args: ValidationArguments) {
    const [customerIdProperty] = args.constraints;
    const customerId = (args.object as any)[customerIdProperty];

    return `Rating for movie ${args.value} already exists from customer with id ${customerId}`;
  }
}
