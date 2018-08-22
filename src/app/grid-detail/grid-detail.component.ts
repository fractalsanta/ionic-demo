import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GridDataResult, GridComponent, PageChangeEvent } from '@progress/kendo-angular-grid';
import { DataService } from '../data.service';
import { ProvincialDamLevel, DamMeasure } from '../data.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-grid-detail',
  template: `
  <kendo-grid
      [data]="levels"
      [height]="200"
    >
  <kendo-grid-column field="date" title="Date" format="{0:c}">
  </kendo-grid-column>
  <kendo-grid-column field="measurement" title="Measurement"format="{0}%">
  </kendo-grid-column>
  </kendo-grid>
`
})
export class GridDetailComponent implements OnInit {
  @Input()
  public levels: DamMeasure[];

  constructor() {}

  public ngOnInit(): void {}
}
