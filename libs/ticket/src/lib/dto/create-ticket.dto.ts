import { IsUUID, Min } from 'class-validator';
import { IsCustomer } from '@cineman/customer';
import { IsSeat } from '@cineman/seat';
import { IsShow } from '@cineman/show';
import { IsSeatUniqueForShow } from '../ticket.validator';

export class CreateTicketDto {
  @Min(0)
  price: number;

  @IsUUID()
  @IsCustomer()
  ownerId: string;

  @IsUUID()
  @IsSeat()
  @IsSeatUniqueForShow('showId')
  seatId: string;

  @IsUUID()
  @IsShow()
  showId: string;
}
