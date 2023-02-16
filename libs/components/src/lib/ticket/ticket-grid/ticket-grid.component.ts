import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ticket } from '@prisma/client';
import { catchError, of } from 'rxjs';
import { QrcodeDialogComponent } from '../qrcode-dialog/qrcode-dialog.component';
import {
  TicketService,
  TicketWithSeatAndOwnerAndShow,
  CustomerService,
  LoginService,
} from '@cineman/services';

@Component({
  selector: 'cineman-ticket-grid',
  templateUrl: './ticket-grid.component.html',
  styleUrls: ['./ticket-grid.component.scss'],
})
export class TicketGridComponent implements OnInit {
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly loginService: LoginService,
    private readonly customerService: CustomerService,
    private readonly ticketService: TicketService,
    private readonly dialog: MatDialog
  ) {}

  tickets: TicketWithSeatAndOwnerAndShow[];

  ngOnInit(): void {
    this.loginService.getUserId().subscribe((id) => {
      this.customerService.findAll(id).subscribe((customers) => {
        if (customers) {
          const customerId = customers[0].id;
          this.ticketService
            .findAll({
              ownerId: customerId,
              includeSeat: true,
              includeShow: true,
            })
            .subscribe((tickets) => {
              console.log(tickets);
              this.tickets = tickets;
            });
        }
      });
    });
  }

  openDialog(ticket: Ticket) {
    this.dialog.open(QrcodeDialogComponent, {
      data: {
        title: 'Ticket',
        qrdata: `${JSON.stringify(ticket)}`,
        qrwidth: '256',
        qrErrorCorrectionLevel: 'M',
      },
    });
  }

  return(ticketId: string) {
    this.ticketService
      .return(ticketId)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log(err.status);
          if (err.status == HttpStatusCode.Forbidden) {
            this.snackBar.open(err.error.message, 'close', {
              duration: 2000,
            });
          } else {
            this.snackBar.open('Unknown error', 'close', {
              duration: 2000,
            });
          }

          throw err;
        })
      )
      .subscribe({
        next: (ticket) =>
          (this.tickets = this.tickets.filter((t) => t.id != ticket.id)),
      });
  }
}
