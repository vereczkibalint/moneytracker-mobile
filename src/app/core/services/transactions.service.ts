import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {Observable, of, throwError} from 'rxjs';
import {Transaction, TransactionResult} from '../models/transaction.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  API_URL: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  fetchTransactions(pageNo: number, pageSize: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.API_URL}/transactions?page=${pageNo}&size=${pageSize}`).pipe(
      catchError(this._handleError)
    );
  }

  fetchRecentTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.API_URL}/transactions/recent?limit=5`);
  }

  deleteTransaction(id: number): Observable<any> {
    // return this.http.delete(`${this.API_URL}/{id}`);
    // TODO: remove mock response if backend is ready
    return of({
      status: "OK"
    });
  }

  _handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
