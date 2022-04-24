import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { Budget } from '../models/budget.model';
import { environment } from '../../../environments/environment';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  API_URL: string = environment.API_URL + '/budgets';
  constructor(private http: HttpClient) { }

  fetchAllBudget(): Observable<Budget[]> {
    return this.http.get<Budget[]>(this.API_URL);
  }

  createBudget(budget: Budget): Observable<Budget> {
    return this.http.post<Budget>(`${this.API_URL}/create`, budget).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
