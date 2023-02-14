import ReactApexChart from "react-apexcharts";

interface BarGraphProps {
  data: {
    colors: string[];
    xAxisLabel: string[];
    stacked: boolean;
    seriesData: {
      name: string;
      data: number[];
    }[];
  };
}
const BarGraph = ({ data }: BarGraphProps) => {
  const option = {
    series: data.seriesData,
  };

  return (
    <div className="h-full pt-5 pb-3" id="chart apexOuter">
      <ReactApexChart
        style={{
          display: "block",
          justifyContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        options={{
          chart: {
            id: "chart",
            stacked: data.stacked,
            toolbar: {
              show: true,
              offsetX: 0,
              offsetY: 0,
              tools: {
                download: true,
                selection: false,
                zoom: false,
                zoomin: false,
                zoomout: false,
                pan: false,
                reset: false,
                customIcons: [],
              },
            },
          },
          xaxis: {
            categories: data.xAxisLabel,
          },

          legend: {
            show: false,
            position: "top",
          },
          colors: data.colors,
        }}
        width={"100%"}
        height={"100%"}
        series={option.series}
        type="bar"
      />
    </div>
  );
};

export default BarGraph;
