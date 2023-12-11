import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

const GraficoDocType = () => {
  const [docTypeData, setDocTypeData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/extracts")
      .then((response) => response.json())
      .then((data) => {
        setDocTypeData(data);
      })
      .catch((error) => {
        console.error("Error fetching document type data:", error);
      });
  }, []);

  const chartData = {
    labels: docTypeData.map((docType) => docType.doc_type),
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
    shadowBlur: 10,
    shadowOffsetX: 5,
    shadowOffsetY: 5,
  };

  return (
    <div>
      <Doughnut id="graficoDocType" data={chartData} options={options} />
    </div>
  );
};

export default GraficoDocType;