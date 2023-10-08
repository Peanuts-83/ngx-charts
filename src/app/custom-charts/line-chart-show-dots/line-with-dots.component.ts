import { Component } from "@angular/core";
import { LineChartComponent } from "@swimlane/ngx-charts/line-chart/line-chart.component";
import { LineComponent } from "@swimlane/ngx-charts/line-chart/line.component";

@Component({
    selector: 'line-with-dots',
    templateUrl: './line-with-dots.component.html'
})
export class LineWithDotsComponent extends LineChartComponent {

}