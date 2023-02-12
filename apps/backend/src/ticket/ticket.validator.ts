import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { TicketService } from "./ticket.service";

export function IsSeatUniqueForShow(showIdProperty: string, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [showIdProperty],
      validator: UniqueSeatForShowRule,
    })
  }
}

@ValidatorConstraint({ name: 'UniqueSeatForShow', async: true })
@Injectable()
export class UniqueSeatForShowRule implements ValidatorConstraintInterface {
  constructor(private readonly ticketService: TicketService) {}

  async validate(value: any, args: ValidationArguments) {
    const [showIdProperty] = args.constraints;
    const showId = (args.object as any)[showIdProperty];

    return this.ticketService.findOne({ seatId_showId: { seatId: value, showId }})
      .then(() => false)
      .catch(() => true);
  }

  defaultMessage(args: ValidationArguments) {
    const [showIdProperty] = args.constraints;
    const showId = (args.object as any)[showIdProperty];

    return `Ticket for seat ${args.value} already exists for Show with id ${showId}`;
  }
}


