import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Button } from 'react-bootstrap';

function GraficoDocType() {
  const [docTypeData, setDocTypeData] = useState([]);
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = sortOption ? `http://localhost:8080/extracts?sort=${sortOption}` : 'http://localhost:8080/extracts';

        const response = await fetch(apiUrl);
        const data = await response.json();

        const docTypeCounts = data.reduce((acc, extract) => {
          const docType = extract.doc_type;
          if (docType) {
            acc[docType] = (acc[docType] || 0) + 1;
          }
          return acc;
        }, {});

        const docTypeArray = Object.entries(docTypeCounts).map(([name, count]) => ({
          name,
          count,
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
          variant="danger-subtle"
          onClick={() => setSortOption("asc")}
        >
          Ordenar Crescente
        </Button>{" "}
        <Button
          variant="danger-subtle"
          onClick={() => setSortOption("desc")}
        >
          Ordenar Decrescente
        </Button>{" "}
        <Button
          variant="danger-subtle"
          onClick={() => setSortOption("")}
        >
          Remover Ordenação
        </Button>
      </div>
      <Bar id="graficoDocType" data={chartData} options={options} style={{ width: '100%' }} />
    </div>
  );
}

export default GraficoDocType;