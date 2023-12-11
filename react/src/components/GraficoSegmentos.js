import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const GraficoSegmentos = () => {
  const chartRef = useRef();
  const [segmentData, setSegmentData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then((response) => response.json())
      .then((data) => {
        setSegmentData(data);
      })
      .catch((error) => {
        console.error("Error fetching segment data:", error);
      });
  }, []);

  useEffect(() => {
    if (segmentData.length > 0) {
      const data = {
        labels: segmentData.map((segment) => segment.segment),
        datasets: [
          {
            data: segmentData.map((segment) => segment.count),
            backgroundColor: segmentData.map((segment) => segment.color),
            borderWidth: 2,
          },
        ],
      };

      const options = {
        cutoutPercentage: 50,
        plugins: {
          title: {
            display: true,
            text: "Segmentos dos Usuários",
            fontSize: 18,
            fontColor: "rgba(255, 182, 193, 1)",
          },
        },
        elements: {
          arc: {
            borderWidth: 2,
          },
        },
        shadowColor: "rgba(0, 0, 0, 0.3)",
        shadowBlur: 10,
        shadowOffsetX: 5,
        shadowOffsetY: 5,
      };

      const ctx = chartRef.current.getContext("2d");
      const myChart = new Chart(ctx, {
        type: "doughnut",
        data: data,
        options: options,
      });

      return () => {
        myChart.destroy();
      };
    }
  }, [segmentData]);

  return (
    <div>
      <canvas id="graficoSegmentos" ref={chartRef}></canvas>
    </div>
  );
};

export default GraficoSegmentos;