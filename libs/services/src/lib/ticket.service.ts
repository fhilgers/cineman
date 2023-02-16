import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Prisma, Ticket } from '@prisma/client';
import { CreateTicketDto, UpdateTicketDto } from '@cineman/ticket';

export type TicketWithSeatAndOwnerAndShow = Prisma.TicketGetPayload<{
  include: { seat: true; owner: true; show: true };
}>;

@Injectable()
export class TicketService {
  ticketPath = 'tickets';

  constructor(private http: HttpClient) {}

  create(createTicketDto: CreateTicketDto) {
    return this.http.post<Ticket>(this.ticketPath, createTicketDto);
  }

  findOne(id: string) {
    return this.http.get<Ticket>(`${this.ticketPath}/${id}`);
  }

  update(id: string, updateTicketDto: UpdateTicketDto) {
    return this.http.patch<Ticket>(`${this.ticketPath}/${id}`, updateTicketDto);
  }

  remove(id: string) {
    return this.http.delete<Ticket>(`${this.ticketPath}/${id}`);
  }

  findAll(params: {
    showId?: string;
    ownerId?: string;
    includeSeat?: boolean;
    includeOwner?: boolean;
    includeShow?: boolean;
  }) {
    const { showId, ownerId, includeSeat, includeOwner, includeShow } = params;

    let httpParams = new HttpParams();

    if (includeSeat) httpParams = httpParams.set('includeSeat', true);
    if (includeOwner) httpParams = httpParams.set('includeOwner', true);
    if (includeShow) httpParams = httpParams.set('includeShow', true);
    if (showId) httpParams = httpParams.set('showId', showId);
    if (ownerId) httpParams = httpParams.set('ownerId', ownerId);

    return this.http.get<TicketWithSeatAndOwnerAndShow[]>(this.ticketPath, {
      params: httpParams,
    });
  }

  buy(id: string) {
    return this.http.post<Ticket>(`${this.ticketPath}/${id}/buy`, {});
  }

  return(id: string) {
    return this.http.post<Ticket>(`${this.ticketPath}/${id}/return`, {});
  }
}
