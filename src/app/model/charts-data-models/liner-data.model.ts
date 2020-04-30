import {ChartDataModel} from './chart-data.model';

export class LinearDataModel {
  name: string;
  series: ChartDataModel[];

  constructor() {
    this.name = null;
    this.series = null;
  }
}
