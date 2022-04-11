import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import {Transaction, TransactionResult} from '../models/transaction.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  API_URL: string = environment.API_URL + '/transactions/recent';

  constructor(private http: HttpClient) { }

  fetchRecentTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.API_URL);
  }

  deleteTransaction(id: number): Observable<any> {
    // return this.http.delete(`${this.API_URL}/{id}`);
    // TODO: remove mock response if backend is ready
    return of({
      status: "OK"
    });
  }
}
