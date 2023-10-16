import { trigger, style, animate, transition } from '@angular/animations';
import { isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, OnChanges, OnInit, PLATFORM_ID, SimpleChanges } from "@angular/core";
import { Series } from '@swimlane/ngx-charts/models/chart-data.model';
import { select } from 'd3-selection';

@Component({
    selector: 'g[line-with-dots]',
    templateUrl: './line-with-dots.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('animationState', [
            transition(':enter', [
                style({
                    strokeDasharray: 2000, 
                    strokeDashoffset: 2000
                }),
                animate(
                    1000,
                    style({
                        strokeDashoffset: 0
                    })
                )
            ])
        ])
    ]
})
export class LineWithDotsComponent implements OnChanges, OnInit {
    @Input() path: string;
    @Input() stroke: string;
    @Input() data: Series;
    @Input() fill: string = 'none';
    @Input() animations: boolean = true;

    // @Output() select = new EventEmitter();

    initialized: boolean = false;
    initialPath: string;

    isSSR = false;

    constructor(private element: ElementRef, @Inject(PLATFORM_ID) private platformId: any) { }

    ngOnInit() {
        if (isPlatformServer(this.platformId)) {
            this.isSSR = true;
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.initialized) {
            this.initialized = true;
            this.initialPath = this.path;
        } else {
            this.updatePathEl();
        }
    }

    updatePathEl(): void {
        const node = select(this.element.nativeElement).select('.line');

        if (this.animations) {
            node.transition().duration(750).attr('d', this.path);
        } else {
            node.attr('d', this.path);
        }
    }

}