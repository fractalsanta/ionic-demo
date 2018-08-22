import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ProvincialDamLevel } from '../data.model';
import { GridDataResult, DataStateChangeEvent, SelectableSettings } from '../../../node_modules/@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, State, process } from '../../../node_modules/@progress/kendo-data-query';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-grid-main',
  templateUrl: 'grid-main.component.html',
  styles: ['a { cursor: pointer; }']
})
export class GridMainComponent implements OnInit {
  @ViewChild(Slides)
  slides: Slides;
  public seriesDate;
  public selectedProvince: any;
  public geoChartData;

  public selectedChart: 'default';

  public gridView: GridDataResult;

  public goToSlide(index: number) {
    this.slides.slideTo(index, 500);
  }

  public selectableSettings: SelectableSettings = {
    checkboxOnly: false,
    mode: 'single'
  };
  public sort: SortDescriptor[] = [
    {
      field: 'province',
      dir: 'asc'
    }
  ];
  public state: State = {
    skip: 0,
    take: 6
  };
  constructor(private dataService: DataService) {}

  ngOnInit() {
    const obs$ = this.dataService.getDamLevels();
    obs$.subscribe((result: ProvincialDamLevel[]) => {
      this.seriesDate = result;
      for (let item of this.seriesDate) {
        item.percentageFull = `${Math.round((item.waterInStorage / item.fsc) * 100)}%`;
        item.province = item.province.substring(2, item.province.length).trim();
      }
      this.loadItems();
      this.setMap();
    });
  }

  selectionChange(item) {
    this.selectedProvince = item.selectedRows[0].dataItem;
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadItems();
  }

  private loadItems(): void {
    this.gridView = {
      data: orderBy(this.seriesDate, this.sort),
      total: this.seriesDate.length
    };
    this.gridView = process(this.seriesDate, this.state);
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridView = process(this.seriesDate, this.state);
  }

  findProvinceByCapital(name: string): ProvincialDamLevel {
    return this.seriesDate.filter(p => p.capital.name === name).pop();
  }

  setMap() {
    const data = this.seriesDate.map(province => {
      return [province.capital.name, (province.waterInStorage * 100) / province.fsc];
    });
    data.unshift(['City', 'Dam level (%)']);

    this.geoChartData = {
      chartType: 'GeoChart',
      dataTable: data,
      options: {
        region: 'ZA',
        displayMode: 'markers',
        resolution: 'provinces',
        colorAxis: { colors: ['red', 'green'] }
      }
    };
  }

  onSelected(province: ProvincialDamLevel) {
    this.selectedProvince = province;
  }

  onMapSelected(event) {
    if (event.selectedRowValues !== null) {
      this.onSelected(this.findProvinceByCapital(event.selectedRowValues[0]));
    }
  }

  setChart(chartName) {
    this.selectedChart = chartName;
  }
}
