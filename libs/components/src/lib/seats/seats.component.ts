import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { SeatType } from '@prisma/client';
import { Observable } from 'rxjs';
import { LoginService, TicketService,
  TicketWithSeatAndOwnerAndShow} from '@cineman/services';

interface TicketData {
  id: string;
  type: SeatType;
  sold: boolean;
}

@Component({
  selector: 'cineman-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.scss'],
})
export class SeatsComponent implements OnInit {
  @Input() tickets: TicketWithSeatAndOwnerAndShow[];

  @Output() buyTicket = new EventEmitter<string>();

  ticketMatrix: TicketData[][];

  isUser$: Observable<boolean>;

  constructor(
    private readonly dialog: MatDialog,
    private readonly loginService: LoginService,
    private readonly ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.isUser$ = this.loginService.isUser();

    const groupedSeats = this.tickets.reduce((group, ticket) => {
      (group[ticket.seat.row] = group[ticket.seat.row] || []).push(ticket);
      return group;
    }, Object.create(null));

    this.ticketMatrix = Object.keys(groupedSeats)
      .sort()
      .map((key) =>
        groupedSeats[key]
          .sort(
            (
              a: TicketWithSeatAndOwnerAndShow,
              b: TicketWithSeatAndOwnerAndShow
            ) => a.seat.number <= b.seat.number
          )
          .map((ticket: TicketWithSeatAndOwnerAndShow) => ({
            id: ticket.id,
            type: ticket.seat.type,
            sold: ticket.ownerId ? true : false,
          }))
      );
  }

  openDialog(ticketId: string) {
    const ticket = this.tickets.find((ticket) => ticket.id == ticketId);

    const dialogRef = this.dialog.open(BuyTicketDialogComponent, {
      data: { ticket, isUser$: this.isUser$ },
    });

    dialogRef.afterClosed().subscribe((bought) => {
      if (bought) this.buyTicket.emit(ticketId);
    });
  }
}

interface DialogData {
  ticket: TicketWithSeatAndOwnerAndShow;
  isUser$: Observable<boolean>;
}

@Component({
  selector: 'cineman-buy-ticket-dialog',
  templateUrl: './buy-ticket-dialog.component.html',
})
export class BuyTicketDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BuyTicketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  buyTicket(): void {
    this.dialogRef.close(true);
  }
}
