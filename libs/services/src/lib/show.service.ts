import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Show } from '@prisma/client';
import { CreateShowDto, UpdateShowDto } from '@cineman/show';

@Injectable()
export class ShowService {
  showPath = 'shows';

  constructor(private http: HttpClient) {}

  create(createShowDto: CreateShowDto) {
    return this.http.post<Show>(this.showPath, createShowDto);
  }

  findOne(id: string) {
    return this.http.get<Show>(`${this.showPath}/${id}`);
  }

  update(id: string, updateShowDto: UpdateShowDto) {
    return this.http.patch<Show>(`${this.showPath}/${id}`, updateShowDto);
  }

  remove(id: string) {
    return this.http.delete<Show>(`${this.showPath}/${id}`);
  }

  findAll(query: { theaterId?: string }) {
    let params = new HttpParams();

    if (query.theaterId) params = params.set('theaterId', query.theaterId);

    return this.http.get<Show[]>(this.showPath, { params });
  }
}
