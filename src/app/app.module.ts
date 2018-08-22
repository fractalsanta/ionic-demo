import { HomePage } from './../pages/home/home';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { DataService } from './data.service';
import { ChartsModule } from 'ng2-charts';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Ng2CompleterModule } from 'ng2-completer';

import { BarChartComponentComponent } from './bar-chart-component/bar-chart-component.component';
import { MapComponentComponent } from './map-component/map-component.component';
import { SummaryComponentComponent } from './summary-component/summary-component.component';
import { TableComponentComponent } from './table-component/table-component.component';
import { AppComponent } from './my-app.component';
import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp,
    AppComponent,
    BarChartComponentComponent,
    MapComponentComponent,
    SummaryComponentComponent,
    TableComponentComponent,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ChartsModule,
    Ng2SmartTableModule,
    Ng2CompleterModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, AppComponent],
  //entryComponents: [GridMainComponent],
  providers: [StatusBar, SplashScreen, DataService, { provide: ErrorHandler, useClass: IonicErrorHandler }]
  /*providers: [StatusBar, SplashScreen, DataService]*/
})
export class AppModule {}
