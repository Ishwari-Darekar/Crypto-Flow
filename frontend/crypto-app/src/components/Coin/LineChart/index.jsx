import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; // ❗ Do NOT remove

function LineChart({ chartData, priceType, multiAxis }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false, // 🔥 THIS FIXES LEFT ALIGNMENT

    plugins: {
      legend: {
        display: multiAxis ? true : false,
        labels: {
          color: "#ffffff",
        },
      },
    },

    interaction: {
      mode: "index",
      intersect: false,
    },

    scales: {
      x: {
        grid: {
          color: "rgba(255,255,255,0.05)",
        },
        ticks: {
          color: "#cfcfcf",
        },
      },
      y: {
        grid: {
          color: "rgba(255,255,255,0.05)",
        },
        ticks: {
          color: "#cfcfcf",
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export default LineChart;
