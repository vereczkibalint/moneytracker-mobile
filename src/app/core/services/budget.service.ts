import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Budget } from '../models/budget.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  API_URL: string = environment.API_URL + '/budgets';
  constructor(private http: HttpClient) { }

  fetchAllBudget(): Observable<Budget[]> {
    return this.http.get<Budget[]>(this.API_URL);
  }
}
