import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';

import { Chart } from 'chart.js';

import { ChartService } from '../../share/services/chart.service';
import { Beacon } from 'src/app/share/models/beacon.model';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {

    @ViewChild('canvas', {static: true}) canvas;

    @Input() set loading(loading: boolean) {
        if (loading && this.chart) {
            this.chart.data.datasets = [];
            this.chart.data.labels = [];
            this.chart.update();
        }
    }
    @Input() set chartData(data: Beacon[]) {
        if (data && this.chart) {
            this.chart.data.datasets = this.chartService.convertData(data);
            this.chart.options.tooltips = this.chartService.getTooltips(data);
            this.chart.update();
        }
    }

    public chart: Chart;

    constructor(private chartService: ChartService) {
    }

    public ngOnInit(): void {
        const chartContext = this.canvas.nativeElement.getContext('2d');
        this.chart = new Chart(chartContext, this.chartService.getOptions());
    }

    public ngOnDestroy(): void {
        if (this.chart) {
            this.chart.destroy();
        }
    }
}
