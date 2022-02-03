import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TyperService {

  constructor() { }

  isUndefined(variable: any) {
    return variable === undefined;
  }
}
