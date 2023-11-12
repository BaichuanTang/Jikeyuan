import * as echarts from "echarts";
import {useEffect, useRef} from "react";

const Barchart = ({title}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // 保证dom可用，才渲染图表

    const myChart = echarts.init(chartRef.current);
    // 指定图表的配置项和数据
    const option = {
      title: {
        text: title
      },
      tooltip: {},
      legend: {
        data: ['满意度']
      },
      xAxis: {
        data: ['vue', 'react', 'angular']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [36, 10, 15]
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    option && myChart.setOption(option);
  }, []);
  return (
      <div ref={chartRef} style={{width: '500px', height: '400px'}}></div>
  )
}

export default Barchart
