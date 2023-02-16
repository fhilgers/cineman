import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Customer } from '@prisma/client';
import { CreateCustomerDto, UpdateCustomerDto } from '@cineman/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  customerPath = 'customers';

  constructor(private http: HttpClient) {}

  create(createCustomerDto: CreateCustomerDto) {
    return this.http.post<Customer>(this.customerPath, createCustomerDto);
  }

  findOne(id: string) {
    return this.http.get<Customer>(`${this.customerPath}/${id}`);
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.http.patch<Customer>(
      `${this.customerPath}/${id}`,
      updateCustomerDto
    );
  }

  remove(id: string) {
    return this.http.delete<Customer>(`${this.customerPath}/${id}`);
  }

  findAll(userId?: string) {
    let params = new HttpParams();

    if (userId) params = params.set('userId', userId);

    return this.http.get<Customer[]>(this.customerPath, { params });
  }
}
