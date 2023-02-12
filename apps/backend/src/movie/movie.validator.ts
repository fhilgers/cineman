import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { MovieService } from './movie.service';

export function IsMovie(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: MovieExistsRule,
    });
  };
}

@ValidatorConstraint({ name: 'MovieExists', async: true })
@Injectable()
export class MovieExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly MovieService: MovieService) {}

  async validate(id: string) {
    return this.MovieService.findOne({ id })
      .then(() => true)
      .catch(() => false);
  }

  defaultMessage(args: ValidationArguments) {
    return `Movie ${args.value} doesn't exist`;
  }
}

export function IsUniqueMovieName(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UniqueMovieNameRule,
    });
  };
}

@ValidatorConstraint({ name: 'UniqueMovieName', async: true })
@Injectable()
export class UniqueMovieNameRule implements ValidatorConstraintInterface {
  constructor(private readonly MovieService: MovieService) {}

  async validate(name: string) {
    return this.MovieService.findOne({ name })
      .then(() => false)
      .catch(() => true);
  }

  defaultMessage(args: ValidationArguments) {
    return `Movie with name ${args.value} already exists`;
  }
}
