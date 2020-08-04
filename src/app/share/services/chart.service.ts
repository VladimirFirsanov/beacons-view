import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { Beacon } from '../models/beacon.model';


@Injectable({
    providedIn: 'root'
})
export class ChartService {

    private _scatterChartData: Beacon[];

    constructor() {
        this._scatterChartData = [];
    }

    private _getColor(): any {
        const colorRGB = '63, 81, 181';
        return {
            backgroundColor: 'transparent',
            borderColor: `rgba(${colorRGB} ,1)`,
            pointBackgroundColor: `rgba(${colorRGB} ,1)`,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: `rgba(${colorRGB} ,0.8)`,
            hoverBackgroundColor: `rgba(${colorRGB} , .1)`
        };
    }

    public convertData(data: Beacon[]): any {
        this._scatterChartData = data;
        const label = 'Beacons';
        const resultArray = [];
        data.forEach(element => {
            resultArray.push({
                x: element.x,
                y: element.y
            });
        });
        return [{
                label,
                data: resultArray,
                ...this._getColor()
            }];
    }

    public getTooltips(data): any {
        const label = 'Beacon';
        return {
            callbacks: {
                title: (tooltipItem) => {
                    return `Beacon`;
                },
                label: (tooltipItem) => {
                    return;
                },
                afterLabel: (tooltipItem) => {
                    const beaconItem = this._scatterChartData[tooltipItem.index];
                    return [
                        `Module name ${beaconItem.moduleName.split(' ').pop()}`,
                        `Date: ${moment(new Date(beaconItem.createdAt)).format('LLL')}`,
                        `X: ${beaconItem.x} , Y: ${beaconItem.y}`
                    ];
                }
            }
        };
    }

    public getOptions(): any {

        return {
            type: 'scatter',
            data: {},
            options: {
                responsive: true,
                maintainAspectRatio: true,
                elements: {
                    line: {
                        borderWidth: 1
                    },
                    point: {
                        radius: 3
                    }

                },
                legend: {
                    display: false
                },
                hover: {
                    mode: 'index',
                    intersect: false
                }
            }
        };
    }
}

