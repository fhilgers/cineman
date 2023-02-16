import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Seat } from '@prisma/client';
import {
  CreateSeatDto as CreateSeatDto,
  UpdateSeatDto as UpdateSeatDto,
} from '@cineman/seat';

@Injectable()
export class SeatService {
  seatPath = 'seats';

  constructor(private http: HttpClient) {}

  create(createSeatDto: CreateSeatDto) {
    return this.http.post<Seat>(this.seatPath, createSeatDto);
  }

  findOne(id: string) {
    return this.http.get<Seat>(`${this.seatPath}/${id}`);
  }

  update(id: string, updateSeatDto: UpdateSeatDto) {
    return this.http.patch<Seat>(`${this.seatPath}/${id}`, updateSeatDto);
  }

  remove(id: string) {
    return this.http.delete<Seat>(`${this.seatPath}/${id}`);
  }

  findAll(theaterId?: string) {
    let params = new HttpParams();

    if (theaterId) params = params.set('theaterId', theaterId);

    return this.http.get<Seat[]>(this.seatPath, { params });
  }
}
