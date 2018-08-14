import { Injectable } from '@angular/core';
import { ProvincialDamLevel } from './data.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/map';
import { GridDataResult } from '../../node_modules/@progress/kendo-angular-grid';
import { TagPlaceholder } from '../../node_modules/@angular/compiler/src/i18n/i18n_ast';

const URL = 'http://localhost:5000/dam-levels';

 @Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  getDamLevels(): Observable<ProvincialDamLevel[]> {
    return this.http.get<ProvincialDamLevel[]>(URL);
  }

  getDamLevelsForKendoGrid(): Observable<GridDataResult> {
    return this.http.get(URL).pipe(
      map(
        response =>
          <GridDataResult>{
            data: response,
            total: 0
          }
      )
    );
  }
}
