export const chartData = [
  {
    chart: "Bar",
    type:"bar",
    width:1250,
    height:250,
    options: {
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 130, 110, 90],
      },
    ],
  },

  {
    chart: "Pie",
    type:"pie",
    width:1250,
    height:50,
    series: [44, 55, 13, 33],
    options: {
      labels: ["Apple", "Banana", "Cherry", "Orange"],
    },
  },

  {
    chart: "StackedBar",
    type:"bar",
    width:1250,
    height:250,
    options: {
      chart: {
        stacked: true,
      },
      xaxis: {
        categories: [
          "Category 1",
          "Category 2",
          "Category 3",
          "Category 4",
          "Category 5",
        ],
      },
    },
    series: [
      {
        name: "Series 1",
        data: [30, 40, 45, 50, 49],
      },
      {
        name: "Series 2",
        data: [10, 20, 25, 30, 29],
      },
      {
        name: "Series 3",
        data: [15, 20, 15, 50, 19],
      },
    ],
  },


  {
    chart: "Donut",
    type:"donut",
    width:1250,
    height:250,
    options: {
      labels: ["Category A", "Category B", "Category C"],
    },
    series: [30, 50, 30],
    legend: {
      position: "bottom",
    },
  },

  {
    chart: "GroupedBar",
    type:"bar",
    width:1250,
    height:250,
    options: {
      stacked: true,
      xaxis: {
        categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
      },
    },
    series: [
      {
        data: [44, 55, 41, 64, 22, 43, 21],
      },
      {
        data: [53, 32, 33, 52, 13, 44, 32],
      },
    ],
  },

  {
    chart:"Area",
    type:"area",
    width:1250,
    height:250,
  options:{
    chart: {
      id: 'area-chart',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
  },
  series:[
    {
      name: 'Series 1',
      data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 100, 80, 60],
    },
  ]
},
];

