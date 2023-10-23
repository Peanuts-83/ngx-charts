import { Component, ChangeDetectionStrategy, Input, TemplateRef, OnInit } from '@angular/core';
import { ColorHelper } from '@swimlane/ngx-charts/common/color.helper';
import { ScaleType } from '@swimlane/ngx-charts/common/types/scale-type.enum';
import { DataItem, Series } from '@swimlane/ngx-charts/models/chart-data.model';
import { Gradient } from '@swimlane/ngx-charts/common/types/gradient.interface';
import { CircleSeriesComponent } from '@swimlane/ngx-charts/common/circle-series.component';
import { formatLabel } from '@swimlane/ngx-charts/common/label.helper';
import { animate, style, transition, trigger } from '@angular/animations';

export enum SeriesType {
  Standard = 'standard',
  Stacked = 'stacked'
}

export interface Circle {
  classNames: string[];
  value: string | number;
  label: string;
  data: DataItem;
  cx: number;
  cy: number;
  radius: number;
  height: number;
  tooltipLabel?: string;
  color: string;
  opacity: number;
  seriesName: string;
  gradientStops?: Gradient[];
  min: number;
  max: number;
  stroke: string;
  strokeWidth: string;
}

/**
 * CircleSeriesComponent evol.
 * The circle factory is used in ngOnCHanges().
 * Stroke & strokeWidth are defined using "if" filtering.
 * You could use any additionnal data sent in the "extra" object from this.data.series.
 */
@Component({
  selector: 'g[circle-series-with-dots]',
  template: `
      <svg:g
        @fadeIn
        circle-with-dots
        *ngFor="let circle of circles"
        class="circle"
        [cx]="circle.cx"
        [cy]="circle.cy"
        [r]="circle.radius"
        [stroke]="circle.stroke"
        [strokeWidth]="circle.strokeWidth"
        [fill]="circle.color"
        [class.active]="isActive({ name: circle.seriesName })"
        [pointerEvents]="circle.value === 0 ? 'none' : 'all'"
        [data]="circle.value"
        [classNames]="circle.classNames"
      />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 0 })),
        animate(500, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class CircleSeriesWithDotsComponent extends CircleSeriesComponent {
  @Input() data: Series;
  @Input() type: SeriesType = SeriesType.Standard;
  @Input() xScale;
  @Input() yScale;
  @Input() colors: ColorHelper;
  @Input() scaleType: ScaleType;
  @Input() visibleValue: any;
  @Input() activeEntries: any[];
  @Input() tooltipDisabled: boolean = true;
  @Input() tooltipTemplate: TemplateRef<any>;


  // Liste des cercles
  circles = [];

  ngOnChanges() {
    for (const i in this.data.series) {
      const d = this.data.series[i]

      // Define the specific values to reveal
      let stroke: string, strokeWidth: string
      if (d.value > 5000 || d.value < 2500) {
        stroke = "none"
        strokeWidth = "0"
      } else {
        stroke = "red"
        strokeWidth = "2px"
      }

      const seriesName = this.data.name as string;

      const value = d.value;
      const label = d.name;
      const tooltipLabel = formatLabel(label);

      let cx;
      if (this.scaleType === ScaleType.Time) {
        cx = this.xScale(label);
      } else if (this.scaleType === ScaleType.Linear) {
        cx = this.xScale(Number(label));
      } else {
        cx = this.xScale(label);
      }

      const cy = this.yScale(this.type === SeriesType.Standard ? value : null);
      const radius = 5;
      const height = this.yScale.range()[0] - cy;
      const opacity = 0;

      let color;
      if (this.colors.scaleType === ScaleType.Linear) {
        if (this.type === SeriesType.Standard) {
          color = this.colors.getColor(value);
        } else {
          color = this.colors.getColor(null);
        }
      } else {
        color = this.colors.getColor(seriesName);
      }

      const data = Object.assign({}, d, {
        series: seriesName,
        value,
        name: label
      });

      this.circles.push({
        classNames: [`circle-data-${i} ${(d.value > 5000 || d.value < 2500) ? 'isSpecific ' : ''}`],
        value,
        label,
        data,
        cx,
        cy,
        stroke,
        strokeWidth,
        radius,
        height,
        tooltipLabel,
        color,
        opacity,
        seriesName,
        min: d.min,
        max: d.max
      });
    }
  }

}