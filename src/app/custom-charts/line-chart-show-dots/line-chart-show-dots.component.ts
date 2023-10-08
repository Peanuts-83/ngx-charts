import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, NgZone, PLATFORM_ID, ViewChild } from '@angular/core';
import { LineChartComponent } from 'projects/swimlane/ngx-charts/src/public-api'
import { ShowDotsService } from 'src/app/services/show-dots.service';

@Component({
    selector: 'line-chart-show-dots',
    templateUrl: './line-chart-show-dots.component.html'
})
export class LineChartShowDotsComponent extends LineChartComponent implements AfterViewInit {
    // @ViewChild('myChart') myChart: any

    // constructor(public chartElement: ElementRef, zone: NgZone, cd: ChangeDetectorRef, @Inject(PLATFORM_ID) public platformId: any, public showDotsService: ShowDotsService) {
    //     super(chartElement, zone, cd, platformId)
    // }

    // ngAfterViewInit(): void {
    //     this.showDotsService.showDots(this.myChart)
    // }
}