import { Component, ChangeDetectionStrategy, Input, SimpleChanges } from '@angular/core';
import { CircleComponent } from '@swimlane/ngx-charts/common/circle.component';

/**
 * CircleComponent evol with stroke & strokeWidth Inputs().
 */
@Component({
    selector: 'g[circle-with-dots]',
    template: `
    <svg:circle
    class="circle"
    [attr.cx]="cx"
    [attr.cy]="cy"
    [attr.r]="r"
    [attr.fill]="fill"
    [attr.stroke]="stroke"
    [attr.stroke-width]="strokeWidth"
    [attr.opacity]="1"
    [attr.class]="classNames"
    [attr.pointer-events]="pointerEvents"
    stroke-width="strokeWidth"
/>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CircleWithDots extends CircleComponent {
  @Input() stroke: any;
  @Input() strokeWidth: any;


  ngOnChanges(changes: SimpleChanges): void {
    this.classNames = Array.isArray(this.classNames) ? this.classNames.join(' ') : '';
    this.classNames += ' circle';
  }
}