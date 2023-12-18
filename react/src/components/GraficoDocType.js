import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Button } from 'react-bootstrap';

function GraficoDocType() {
  const [docTypeData, setDocTypeData] = useState([]);
  const [sortOption, setSortOption] = useState('asc'); // Defina a ordenação padrão

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `http://localhost:8080/extracts/${sortOption}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        const docTypeArray = data.map(({ doc_type, contagem }) => ({
          name: doc_type,
          count: contagem,
          color: getRandomColor(),
        }));

        setDocTypeData(docTypeArray);
      } catch (error) {
        console.error('Error fetching document type data:', error);
      }
    };

    fetchData();
  }, [sortOption]);

  const chartData = {
    labels: docTypeData.map((docType) => docType.name),
    datasets: [{
      label: 'Quantidade',
      data: docTypeData.map((docType) => docType.count),
      backgroundColor: docTypeData.map((docType) => docType.color),
      borderWidth: 2,
    }],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Tipos de Documentos',
        fontSize: 18,
        fontColor: 'rgba(255, 182, 193, 1)',
      },
    },
    elements: {
      rectangle: {
        borderWidth: 2,
      },
    },
    legend: {
      display: false
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          autoSkip: true,
          maxRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
        min: 0,
      },
    },
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
    <div style={{ height: '300px' }}>
      <div className="mb-1">
        <Button
          className="bg-danger-subtle text-black"
          onClick={() => setSortOption("asc")}
        >
          Ordem Crescente
        </Button>{" "}
        <Button
          className="bg-danger-subtle text-black"
          onClick={() => setSortOption("desc")}
        >
          Ordem Decrescente
        </Button>
      </div>
      <Bar id="graficoDocType" data={chartData} options={options} style={{ width: '100%' }} />
    </div>
  );
}

export default GraficoDocType;