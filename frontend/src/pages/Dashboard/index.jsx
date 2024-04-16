import { useRequest } from "../../core/hooks/useRequest";

// Charts
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const sendRequest = useRequest();
  const [chartData, setChartData] = useState({
    labels: [],
    tasks: {},
  });

  const getStatistics = () => {
    sendRequest("GET", "/user/statistics")
      .then((response) => {
        const { labels, counts } = response.data;
        setChartData({
          labels: labels,
          tasks: counts,
        });
      })
      .catch((error) => console.log(error));
  };

  const options = {
    responsive: true,
    scale: {
      ticks: {
        precision: 0,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "My Tasks' Statistics",
      },
    },
  };

  const labels = chartData.labels;

  const data = {
    labels,
    datasets: [
      {
        label: "Tasks Created",
        data: labels.map((date) => chartData?.tasks?.[date]),
        borderColor: "rgb(79, 70, 229)",
        backgroundColor: "rgba(79, 70, 229, 0.5)",
      },
    ],
  };

  useEffect(() => {
    getStatistics();
  }, []);

  return (
    <div>
      <h2>Statistics</h2>
      <Line options={options} data={data} />
    </div>
  );
};

export default Dashboard;
