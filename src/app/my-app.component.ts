import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { ProvincialDamLevel } from './data.model';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';

export interface IFlatProvinces {
  province: string;
  capital: string;
  fsc: number;
  waterInStorage: number;
  full: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './my-app.component.html'
})
export class AppComponent implements OnInit {
  @ViewChild(Slides)
  slides: Slides;

  provinces: ProvincialDamLevel[];
  public flatProvinces: IFlatProvinces[];

  public selectedProvince: ProvincialDamLevel;
  public barChartData = null;
  public stackedBarChartData = null;
  public chartLabels = null;
  public lineChartData = null;
  public selectedData = null;
  public selectedLabel = null;
  public randomProvince = null;
  public stackedBarChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [
        {
          stacked: true
        }
      ],
      xAxes: [
        {
          stacked: true
        }
      ]
    }
  };

  public goToSlide(index: number) {
    this.slides.slideTo(index, 500);
  }

  public lineChartOptions: any = {
    elements: {
      line: {
        tension: 0 // disables bezier curves
      }
    },
    scales: {
      yAxes: [
        {
          ticks: { beginAtZero: true },
          scaleLabel: { labelString: 'Dam level (%)' }
        }
      ]
    }
  };

  public doughnutChartOptions: any = {
    responsive: true,
    cutoutPercentage: 60,
    rotation: -3.1415926535898,
    circumference: 3.1415926535898
  };

  constructor(private dataService: DataService) {}

  ngOnInit() {
    const obs$ = this.dataService.getDamLevels();
    obs$.subscribe((pdl: ProvincialDamLevel[]) => {
      this.provinces = pdl;
      this.flatProvinces = pdl.map(province => {
        return {
          province: province.province,
          capital: province.capital.name,
          fsc: province.fsc,
          waterInStorage: province.waterInStorage,
          full: (province.waterInStorage * 100) / province.fsc
        };
      });
    });
  }

  onRowSelected(event) {
    const province = this.findProvinceByName(event.data.province);
    this.onSelected(province);
  }

  findProvinceByName(name: string): ProvincialDamLevel {
    return this.provinces.filter(p => p.province === name).pop();
  }

  onSelected(province: ProvincialDamLevel) {
    this.selectedProvince = province;
    this.selectedData = null;
    this.selectedLabel = null;
    this.barChartData = [
      { data: this.selectedProvince.levels.map(measure => measure.measurement), label: `${province.province} Dam Level (%)` }
    ];
    this.chartLabels = this.selectedProvince.levels.map(measure => measure.date);
    this.buildLineChartData(province);
  }

  chartClicked = (event: any) => {
    const measure = this.selectedProvince.levels[event.active[0]._index].measurement;

    this.selectedData = [{ data: [measure, 100 - measure] }];
    this.selectedLabel = ['Dam level (%)', 'Unused Dam capacity (%)'];
  };

  buildLineChartData(province: ProvincialDamLevel) {
    this.randomProvince = this.getAnotherRandomProvince(province);
    this.lineChartData = [
      { data: province.levels.map(measure => measure.measurement), label: `${province.province} Dam Level (%)`, fill: false },
      {
        data: this.randomProvince.levels.map(measure => measure.measurement),
        label: `${this.randomProvince.province} Dam Level (%)`,
        fill: false
      }
    ];
  }

  // Super lazy :)
  getAnotherRandomProvince(province: ProvincialDamLevel): ProvincialDamLevel {
    const numberOfProvinces = this.provinces.length;
    const randomEntry = this.provinces[Math.floor(Math.random() * numberOfProvinces)];
    if (randomEntry.province === province.province) {
      return this.getAnotherRandomProvince(province);
    }
    return randomEntry;
  }
}
