import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const GraficoSegmentos = () => {
  const chartRef = useRef();
  const [segmentData, setSegmentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch("http://localhost:8080/users");
        const usersData = await usersResponse.json();
        const uniqueSegmentsUsers = Array.from(new Set(usersData.map(user => user.segment)));
        const segmentsResponse = await fetch("http://localhost:8080/users/segments");
        const segmentsData = await segmentsResponse.json();
        const uniqueSegments = Array.from(new Set([...uniqueSegmentsUsers, ...segmentsData.map(segment => segment.name)]));
        const segmentCounts = uniqueSegments.map((segment) => {
          const userCount = usersData.filter(user => user.segment === segment).length;
          return {
            name: segment,
            count: userCount,
          };
        });

        setSegmentData(segmentCounts);
      } catch (error) {
        console.error("Error fetching segment data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (segmentData.length > 0) {
      const data = {
        labels: segmentData.map((segment) => segment.name),
        datasets: [
          {
            data: segmentData.map((segment) => segment.count),
            backgroundColor: segmentData.map((segment) => getRandomColor()),
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
        shadowBlur: 20,
        shadowOffsetX: 15,
        shadowOffsetY: 15,
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

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div>
      <canvas id="graficoSegmentos" ref={chartRef}></canvas>
    </div>
  );
};

export default GraficoSegmentos;
