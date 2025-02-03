import React from 'react';
import ReactApexChart from 'react-apexcharts';
import AgGrid from "../components/AgGrid/AgGrid";
const staticLabels = window.appLabel;

const Charts = () => {
  const series = [
    {
      name: 'Series 1',
      data: [44, 55, 41, 67, 22, 43]
    },
    {

      name: 'Series 2',
      data: [13, 23, 20, 8, 13, 27]
    },
    {
      name: 'Series 3',
      data: [11, 17, 15, 15, 21, 14]
    },
    {
      name: 'Series 4',
      data: [21, 7, 25, 13, 22, 8]
    }
  ];

  const options = {
      stacked: true,
      toolbar: {
        show: true
      },

    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    title: {
      text: 'Stacked Bar Chart',
      align: 'center',
      style: {
        fontSize: '20px'
      }
    },
    xaxis: {
      categories: ['January', 'February', 'March', 'April', 'May', 'June'],
    },
    yaxis: {
      title: {
        text: 'Points',
      },
    },
  
    
  };

  const series1 = [65, 32, 15];

  const options1 = {
    chart: {
      type: 'pie',
      height: 350,
    },
    labels: ['Success','Error','Duplicates'],
  };
  const columns = [
    {
      headerName: "",
      field: "",
      checkboxSelection: true,
      maxWidth: "30",
      sortable: false,
      wrapText: false,
    },
    {
      headerName: staticLabels.manageLists.CAGList.internalTableHeaders.org,
      headerTooltip: staticLabels.manageLists.CAGList.internalTableHeaders.org,
      field: "org",
      tooltipField: "org",
      width: 110,
      sortable: true,
      minWidth: 100,
      maxWidth: 180,
      wrapText: false,
    },
    {
      headerName: staticLabels.manageLists.CAGList.internalTableHeaders.carrier,
      headerTooltip:
        staticLabels.manageLists.CAGList.internalTableHeaders.carrier,
      field: "carrier",
      tooltipField: "carrier",
      width: 110,
      minWidth: 100,
      maxWidth: 180,
      wrapText: false,
      sortable: true,
    },
    {
      headerName: staticLabels.manageLists.CAGList.internalTableHeaders.account,
      headerTooltip:
        staticLabels.manageLists.CAGList.internalTableHeaders.account,
      field: "account",
      tooltipField: "account",
      width: 110,
      minWidth: 100,
      maxWidth: 180,
      wrapText: false,
      sortable: true,
    },
    {
      headerName: staticLabels.manageLists.CAGList.internalTableHeaders.group,
      headerTooltip:
        staticLabels.manageLists.CAGList.internalTableHeaders.group,
      field: "group",
      tooltipField: "group",
      width: 110,
      minWidth: 100,
      maxWidth: 180,
      wrapText: false,
      sortable: true,
    },
    {
      headerName: staticLabels.manageLists.CAGList.internalTableHeaders.modifiedby,
      headerTooltip:
        staticLabels.manageLists.CAGList.internalTableHeaders.modifiedBy,
      field: "modifiedBy",
      tooltipField: "modifiedby",
      width: 110,
      minWidth: 100,
      maxWidth: 180,
      wrapText: false,
      sortable: true,
    },
    {
      headerName: staticLabels.manageLists.CAGList.internalTableHeaders.modifiedon,
      headerTooltip:
        staticLabels.manageLists.CAGList.internalTableHeaders.modifiedOn,
      field: "modifiedOn",
      tooltipField: "modifiedon",
      width: 110,
      minWidth: 100,
      maxWidth: 180,
      wrapText: false,
      sortable: true,
      
    },
    {
      headerName: staticLabels.manageLists.CAGList.actions.action,
      headerTooltip: staticLabels.manageLists.CAGList.actions.action,
      field: "org",
      tooltipField: "org",
      width: 110,
      minWidth: 100,
      maxWidth: 180,
      wrapText: false,
      sortable: true,
    
    },
  ];
  const seriesBar = [{
    data: [30, 90, 45]
  }];
  const seriesBar1 = [{
    data: [900, 470]
  }];


  
  const optionsBar = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
        distributed: true
      },
    },

    xaxis: {
      categories: ["Total HistorySet's","Total Scenarioes","Total Processed"],
    },
    yaxis: {
      title: {
        text: 'No of Records',
      },
    },
  
theme: {
 palette:'palette1'
},
legend: {
    position: 'top',
    horizontalAlign: 'left',
    // offsetX: 40
  },
    tooltip: {
      y: {
        formatter: function(val) {
          return val;
        },
      },
    },
  };
  const optionsBar1 = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
        distributed: true
      },
    },

    xaxis: {
      categories: ["Total Scenarioes Uploaded","Total Scenario's Processed"],
   
    },
    yaxis: {
      title: {
        text: 'No of Records',
      },
    },
  
theme: {
 palette:'palette1'
},
legend: {
    position: 'top',
    horizontalAlign: 'left',
    // offsetX: 40
  },
    tooltip: {
      y: {
        formatter: function(val) {
          return val;
        },
      },
    },
  };
  
  return (
    <div className="charts_container">
        <div className='chartsDivision'>
        <div className='chartBox'>  
            <ReactApexChart options={optionsBar} series={seriesBar} type="bar" height={350} />
            
            </div>
            <div className='chartBox'>
            
            <ReactApexChart options={options1} series={series1} type="pie" height={350}/>
            </div>
            <div className='chartBox'>
            <ReactApexChart options={optionsBar1} series={seriesBar1} type="bar" height={350} />
             </div>

       
            </div>
      
        <div>
            <AgGrid columns={columns}
            headerHeight={60}
            pagination={true}
            showPageSize={true}
            showSearch={true}></AgGrid>
        </div>
    </div>
  );
};

export default Charts;
