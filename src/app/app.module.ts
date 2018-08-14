import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

//Chart imports
import { HttpClientModule } from '@angular/common/http';

//import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DataService } from './data.service';
import { GridModule } from '@progress/kendo-angular-grid';
import { ChartModule } from '@progress/kendo-angular-charts';
import { GridDetailComponent } from './grid-detail/grid-detail.component';
import { GridMainComponent } from './grid-main/grid-main.component';
import { ChartBarLevelsComponent } from './chart-bar-levels/chart-bar-levels.component';
import { ChartLineLevelsComponent } from './chart-line-levels/chart-line-levels.component';
import { ChartStackedLevelsComponent } from './chart-stacked-levels/chart-stacked-levels.component';
import { ChartGaugeComponent } from './chart-gauge/chart-gauge.component';
import { GaugesModule } from '@progress/kendo-angular-gauges';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GridDetailComponent,
    GridMainComponent,
    ChartBarLevelsComponent,
    ChartLineLevelsComponent,
    ChartStackedLevelsComponent,
    ChartGaugeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GridModule,
    ChartModule,
    GaugesModule,
    Ng2GoogleChartsModule,
    BrowserModule,
    HttpClientModule,
    GridModule,
    ChartModule,
    GaugesModule,
    Ng2GoogleChartsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, GridMainComponent],
  providers: [StatusBar, SplashScreen, DataService, { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule {}
