import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';
import { SparklineComponent } from './custom-charts/sparkline/sparkline.component';
import { TimelineFilterBarChartComponent } from './custom-charts/timeline-filter-bar-chart/timeline-filter-bar-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts/ngx-charts.module';
import { NgxUIModule } from '@swimlane/ngx-ui';
import { ComboChartComponent, ComboSeriesVerticalComponent } from './custom-charts/combo-chart';
import { BubbleChartInteractiveModule } from './custom-charts/bubble-chart-interactive';
import { CircleSeriesWithDotsComponent } from './custom-charts/line-chart-show-dots/circle-series-with-dots.component';
import { CircleWithDots } from './custom-charts/line-chart-show-dots/circle-with-dots.component';
import { LineChartShowDotsComponent } from './custom-charts/line-chart-show-dots/line-chart-show-dots.component';

@NgModule({
  providers: [
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseLocation
    }
  ],
  imports: [
    NgxChartsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxUIModule,
    BubbleChartInteractiveModule
  ],
  declarations: [
    AppComponent,
    SparklineComponent,
    TimelineFilterBarChartComponent,
    ComboChartComponent,
    ComboSeriesVerticalComponent,
    LineChartShowDotsComponent,
    CircleSeriesWithDotsComponent,
    CircleWithDots
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function getBaseLocation() {
  const paths: string[] = location.pathname.split('/').splice(1, 1);
  const basePath: string = (paths && paths[0]) || '';
  return '/' + basePath;
}
