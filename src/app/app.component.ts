import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataService } from './data.service';
import { HomePage } from '../pages/home/home';
import { GridMainComponent } from './grid-main/grid-main.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class MyApp {
  rootPage: any = GridMainComponent;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private dataService: DataService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

// import { Component, OnInit } from '@angular/core';
// import { DataService } from './data.service';
// import { ProvincialDamLevel } from './data.model';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {
//   title = 'analytics-poc';
//   seriesDate;

//   constructor(private dataService: DataService) {}

//   ngOnInit() {
//     const obs$ = this.dataService.getDamLevels();
//     obs$.subscribe((pdl: ProvincialDamLevel[]) => {
//       this.seriesDate = pdl;
//     });
//   }
// }
