import { IsUUID, Min } from 'class-validator';
import { IsCustomer } from '../../customer/customer.validator';
import { IsSeat } from '../../seat/seat.validator';
import { IsShow } from '../../show/show.validator';
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
