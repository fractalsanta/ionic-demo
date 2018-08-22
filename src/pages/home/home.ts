import { DataService } from './../../app/data.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProvincialDamLevel } from './../../app/data.model';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  seriesDate;
  constructor(public navCtrl: NavController, private dataService: DataService) {}

  ngOnInit() {
    const obs$ = this.dataService.getDamLevels();
    obs$.subscribe((pdl: ProvincialDamLevel[]) => {
      this.seriesDate = pdl;
    });
  }
}
