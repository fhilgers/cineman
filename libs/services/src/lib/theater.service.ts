import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Theater } from '@prisma/client';
import { CreateTheaterDto, UpdateTheaterDto } from '@cineman/theater';

@Injectable()
export class TheaterService {
  theaterPath = 'theaters';

  constructor(private http: HttpClient) {}

  create(createTheaterDto: CreateTheaterDto) {
    return this.http.post<Theater>(this.theaterPath, createTheaterDto);
  }

  findOne(id: string) {
    return this.http.get<Theater>(`${this.theaterPath}/${id}`);
  }

  update(id: string, updateTheaterDto: UpdateTheaterDto) {
    return this.http.patch<Theater>(
      `${this.theaterPath}/${id}`,
      updateTheaterDto
    );
  }

  remove(id: string) {
    return this.http.delete<Theater>(`${this.theaterPath}/${id}`);
  }

  findAll() {
    return this.http.get<Theater[]>(this.theaterPath);
  }
}
