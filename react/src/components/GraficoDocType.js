import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Button, Dropdown } from 'react-bootstrap';

function GraficoDocType() {
  const [docTypeData, setDocTypeData] = useState([]);
  const [sortOption, setSortOption] = useState('asc'); // Defina a ordenação padrão
  const [selectedUser, setSelectedUser] = useState(null);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersResponse = await fetch('http://localhost:8080/users');
        const usersData = await usersResponse.json();
        setUsersList(usersData);
      } catch (error) {
        console.error('Error fetching users data:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedUser) {
          const apiUrl = `http://localhost:8080/users/${selectedUser.id}/doctype`;
          const response = await fetch(apiUrl);
          const data = await response.json();

          const docTypeArray = data.map(({ doc_type, contagem }) => ({
            name: doc_type,
            count: contagem,
            color: getRandomColor(),
          }));

          setDocTypeData(docTypeArray);
        } else {
          const apiUrl = `http://localhost:8080/extracts/${sortOption}`;
          const response = await fetch(apiUrl);
          const data = await response.json();

          const docTypeArray = data.map(({ doc_type, contagem }) => ({
            name: doc_type,
            count: contagem,
            color: getRandomColor(),
          }));

          setDocTypeData(docTypeArray);
        }
      } catch (error) {
        console.error('Error fetching document type data:', error);
      }
    };

    fetchData();
  }, [selectedUser, sortOption]);

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
        text: `Tipos de Documentos - ${selectedUser ? selectedUser.name : 'Todos os Usuários'}`,
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
      display: false,
    },
    scales: {
      x: {
        beginAtZero: true,
        min: 0,
        suggestedMax: 500,
        stepSize: 100,   
        ticks: {
          autoSkip: true,
          maxRotation: 45,
          fontSize: 12,
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
    <div style={{ height: '400px' }}>
      <div className="mb-1">
        <Dropdown>
          <Dropdown.Toggle className="mb-1 bg-danger-subtle text-black" id="dropdown-users">
            {selectedUser ? selectedUser.name : 'Escolha um Usuário'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item className="bg-danger-subtle text-black" onClick={() => setSelectedUser(null)}>Todos os Usuários</Dropdown.Item>
            {usersList.map((user) => (
              <Dropdown.Item className="bg-danger-subtle text-black" key={user.id} onClick={() => setSelectedUser(user)}>
                {user.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
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
      <Bar id="graficoDocType" data={chartData} options={options} style= {{height: '100%', width: '100%' }} />
    </div>
  );
}

export default GraficoDocType;