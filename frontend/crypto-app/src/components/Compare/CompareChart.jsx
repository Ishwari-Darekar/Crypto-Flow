import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function CompareChart({ data1 = [], data2 = [], label1, label2 }) {
  if (!data1.length || !data2.length) return null;

  const labels = data1.map((item) => item.date);

  const chartData = {
    labels,
    datasets: [
      {
        label: label1.toUpperCase(),
        data: data1.map((item) => item.value),
        borderColor: "#3a80e9",
        borderWidth: 1.,      // 🔥 make line thin
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
      {
        label: label2.toUpperCase(),
        data: data2.map((item) => item.value),
        borderColor: "#16c784",
        borderWidth: 1.5,      // 🔥 make line thin
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "#fff" },
      },
    },
    scales: {
      x: {
        ticks: { color: "#aaa" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#aaa" },
        grid: { color: "#222" },
      },
    },
  };

  return (
    <div style={{ height: "350px", marginTop: "2rem" }}>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default CompareChart;
