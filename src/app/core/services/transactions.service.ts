import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { TransactionResult } from '../models/transaction.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  API_URL: string = environment.API_URL + '/transactions';

  constructor(private http: HttpClient) { }

  fetchAllTransaction(): Observable<TransactionResult> {
    return this.http.get<TransactionResult>(this.API_URL);
  }
}
