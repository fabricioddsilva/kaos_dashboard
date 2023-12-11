import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

const GraficoDocType = () => {
  const [docTypeData, setDocTypeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/extracts/doc_type");
        const data = await response.json();
        const docTypeCounts = data.reduce((acc, extract) => {
          const docType = extract.doc_type;
          acc[docType] = (acc[docType] || 0) + 1;
          return acc;
        }, {});

        const docTypeArray = Object.entries(docTypeCounts).map(([name, count]) => ({
          name,
          count,
          color: getRandomColor(),
        }));

        setDocTypeData(docTypeArray);
      } catch (error) {
        console.error("Error fetching document type data:", error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: docTypeData.map((docType) => docType.name),
    datasets: [{
      data: docTypeData.map((docType) => docType.count),
      backgroundColor: docTypeData.map((docType) => docType.color),
      borderWidth: 2,
    }],
  };

  const options = {
    cutoutPercentage: 50,
    plugins: {
      title: {
        display: true,
        text: 'Tipos de Documentos',
        fontSize: 18,
        fontColor: 'rgba(255, 182, 193, 1)',
      },
    },
    elements: {
      arc: {
        borderWidth: 2,
      },
    },
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowBlur: 20,
      shadowOffsetX: 15,
      shadowOffsetY: 15,
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div>
      <Doughnut id="graficoDocType" data={chartData} options={options} />
    </div>
  );
};

export default GraficoDocType;