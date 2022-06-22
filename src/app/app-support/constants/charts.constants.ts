// import { ChartOptions, ChartType, ChartDataSets, Chart } from 'chart.js';
// import { Label, Color } from 'ng2-charts';
// import * as ChartLabelPlugin from 'chartjs-plugin-labels';
// import { formatNumber } from './utils';

// Chart.plugins.register(ChartLabelPlugin);

// // if (JSON.parse(window.localStorage.getItem('plax_dark_mode'))) {
// //   Chart.defaults.global.defaultFontColor = '#fff';
// // }

// export class BarChart  {
//     public options: ChartOptions = {
//       responsive: true,
//       scales: {
//         xAxes: [{
//             gridLines: {
//                 display: false
//             }
//         }],
//         yAxes: [{
//             ticks: {
//                 suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
//             }
//         }]
//       },
//       plugins: {
//         labels: {
//           // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
//           render: (args) => {
//             return formatNumber(args.value);
//           },
//           // position: 'border',
//         }
//       },
//       layout: {
//         padding: {
//           left: 0,
//           right: 0,
//           top: 18,
//           bottom: 0
//         }
//       },
//     };
//     public labels: Label[] = [];
//     public chartType: ChartType = 'bar';
//     public legend = true;
//     public plugins = [];

//     public data: ChartDataSets[] = [
//       { data: [], label: '' }
//     ];

//     constructor() {
//     }
//   }

// export class LineChart  {
//     public options: ChartOptions = {
//       responsive: true,
//       plugins: {
//         labels: {
//           // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
//           render: (args) => {
//             return formatNumber(args.value);
//           },
//           // position: 'border',
//         }
//       },
//     };
//     public labels: Label[] = [];
//     public chartType: ChartType = 'line';
//     public legend = true;
//     public plugins = [];

//     public data: ChartDataSets[] = [
//         { data: [], label: '' }
//     ];

//     constructor() {
//     }
//   }

//   export class PieChart  {
//       public options: ChartOptions = {
//         responsive: true,
//         plugins: {
//           labels: {
//             // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
//             render: 'percentage',

//             // precision for percentage, default is 0
//             precision: 0,
//             position: 'border',
//           }
//         },
//       };
//       public labels: Label[] = [];
//     //   public labels: Label[] = ['Female', 'Male']; e.g
//       public chartType: ChartType = 'pie';
//       public legend = true;
//       public plugins = [ChartLabelPlugin];

//       public data: ChartDataSets[] = [
//         { data: [], label: '' }
//       ];

//       constructor() {
//       }
//     }
