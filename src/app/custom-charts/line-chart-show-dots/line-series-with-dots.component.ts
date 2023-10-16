import { Component, ChangeDetectionStrategy, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ColorHelper } from '@swimlane/ngx-charts/common/color.helper';
import { BarOrientation } from '@swimlane/ngx-charts/common/types/bar-orientation.enum';
import { Gradient } from '@swimlane/ngx-charts/common/types/gradient.interface';
import { ScaleType } from '@swimlane/ngx-charts/common/types/scale-type.enum';
import { Series } from '@swimlane/ngx-charts/models/chart-data.model';
import { sortLinear, sortByTime, sortByDomain } from '@swimlane/ngx-charts/utils/sort';
import { id } from '@swimlane/ngx-ui';
import { line, area } from 'd3-shape';

@Component({
    selector: 'g[line-series-with-dots]',
    template: `
    <svg:g>
      <defs>
        <svg:g
          ngx-charts-svg-linear-gradient
          *ngIf="hasGradient"
          [orientation]="barOrientation.Vertical"
          [name]="gradientId"
          [stops]="gradientStops"
        />
      </defs>
      <svg:g
        ngx-charts-area
        class="line-highlight"
        [data]="data"
        [path]="areaPath"
        [fill]="hasGradient ? gradientUrl : colors.getColor(data.name)"
        [opacity]="0.25"
        [startOpacity]="0"
        [gradient]="true"
        [stops]="areaGradientStops"
        [class.active]="isActive(data)"
        [class.inactive]="isInactive(data)"
        [animations]="animations"
      />
      <svg:g
        line-with-dots
        class="line-series"
        [data]="data"
        [path]="path"
        [stroke]="stroke"
        [animations]="animations"
        [class.active]="isActive(data)"
        [class.inactive]="isInactive(data)"
      />
      <svg:g
        ngx-charts-area
        *ngIf="hasRange"
        class="line-series-range"
        [data]="data"
        [path]="outerPath"
        [fill]="hasGradient ? gradientUrl : colors.getColor(data.name)"
        [class.active]="isActive(data)"
        [class.inactive]="isInactive(data)"
        [opacity]="rangeFillOpacity"
        [animations]="animations"
      />
    </svg:g>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineSeriesWithDotsComponent implements OnChanges {
    @Input() data: Series;
    @Input() xScale;
    @Input() yScale;
    @Input() colors: ColorHelper;
    @Input() scaleType: ScaleType;
    @Input() curve: any;
    @Input() activeEntries: any[];
    @Input() rangeFillOpacity: number;
    @Input() hasRange: boolean;
    @Input() animations: boolean = true;

    path: string;
    outerPath: string;
    areaPath: string;
    gradientId: string;
    gradientUrl: string;
    hasGradient: boolean;
    gradientStops: Gradient[];
    areaGradientStops: Gradient[];
    stroke: string;

    barOrientation = BarOrientation;

    ngOnChanges(changes: SimpleChanges): void {
        this.update();
    }

    update(): void {
        this.updateGradients();

        const data = this.sortData(this.data.series);

        const lineGen = this.getLineGenerator();
        this.path = lineGen(data) || '';

        const areaGen = this.getAreaGenerator();
        this.areaPath = areaGen(data) || '';

        if (this.hasRange) {
            const range = this.getRangeGenerator();
            this.outerPath = range(data) || '';
        }

        if (this.hasGradient) {
            this.stroke = this.gradientUrl;
            const values = this.data.series.map(d => d.value);
            const max = Math.max(...values);
            const min = Math.min(...values);
            if (max === min) {
                this.stroke = this.colors.getColor(max);
            }
        } else {
            this.stroke = this.colors.getColor(this.data.name);
        }
    }

    getLineGenerator(): any {
        return line<any>()
            .x(d => {
                const label = d.name;
                let value;
                if (this.scaleType === ScaleType.Time) {
                    value = this.xScale(label);
                } else if (this.scaleType === ScaleType.Linear) {
                    value = this.xScale(Number(label));
                } else {
                    value = this.xScale(label);
                }
                return value;
            })
            .y(d => this.yScale(d.value))
            .curve(this.curve);
    }

    getRangeGenerator(): any {
        return area<any>()
            .x(d => {
                const label = d.name;
                let value;
                if (this.scaleType === ScaleType.Time) {
                    value = this.xScale(label);
                } else if (this.scaleType === ScaleType.Linear) {
                    value = this.xScale(Number(label));
                } else {
                    value = this.xScale(label);
                }
                return value;
            })
            .y0(d => this.yScale(typeof d.min === 'number' ? d.min : d.value))
            .y1(d => this.yScale(typeof d.max === 'number' ? d.max : d.value))
            .curve(this.curve);
    }

    getAreaGenerator(): any {
        const xProperty = d => {
            const label = d.name;
            return this.xScale(label);
        };

        return area<any>()
            .x(xProperty)
            .y0(() => this.yScale.range()[0])
            .y1(d => this.yScale(d.value))
            .curve(this.curve);
    }

    sortData(data) {
        if (this.scaleType === ScaleType.Linear) {
            data = sortLinear(data, 'name');
        } else if (this.scaleType === ScaleType.Time) {
            data = sortByTime(data, 'name');
        } else {
            data = sortByDomain(data, 'name', 'asc', this.xScale.domain());
        }

        return data;
    }

    updateGradients() {
        if (this.colors.scaleType === ScaleType.Linear) {
            this.hasGradient = true;
            this.gradientId = 'grad' + id().toString();
            this.gradientUrl = `url(#${this.gradientId})`;
            const values = this.data.series.map(d => d.value);
            const max = Math.max(...values);
            const min = Math.min(...values);
            this.gradientStops = this.colors.getLinearGradientStops(max, min);
            this.areaGradientStops = this.colors.getLinearGradientStops(max);
        } else {
            this.hasGradient = false;
            this.gradientStops = undefined;
            this.areaGradientStops = undefined;
        }
    }

    isActive(entry): boolean {
        if (!this.activeEntries) return false;
        const item = this.activeEntries.find(d => {
            return entry.name === d.name;
        });
        return item !== undefined;
    }

    isInactive(entry): boolean {
        if (!this.activeEntries || this.activeEntries.length === 0) return false;
        const item = this.activeEntries.find(d => {
            return entry.name === d.name;
        });
        return item === undefined;
    }
}
