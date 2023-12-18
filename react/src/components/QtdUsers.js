import React, { useState, useEffect } from "react";
import { Button, Card, Container, Modal, Row, Table, Dropdown } from "react-bootstrap";
import { AiOutlineUser } from "react-icons/ai";

function QtdUsers() {
  const [show, setShow] = useState(false);
  const [numUsers, setNumUsers] = useState(0);
  const [userList, setUserList] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [filterType, setFilterType] = useState("none");
  const handleClose = () => {
    setShow(false);
    setFilterType("none");
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then((response) => response.json())
      .then((countData) => {
        setNumUsers(countData.length);
      })
      .catch((error) => {
        console.error("Error fetching user count:", error);
      });

    fetch("http://localhost:8080/users")
      .then((response) => response.json())
      .then((data) => {
        setUserList(data);
      })
      .catch((error) => {
        console.error("Error fetching users list:", error);
      });
  }, []);

  const applyFilter = () => {
    if (filterType === "none") {
      setFilteredUserList(userList);
    } else if (filterType === "occurrences") {
      const filteredList = userList.filter((user) => user.ocorrencias > 0);
      setFilteredUserList(filteredList);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [filterType, userList]);

  return (
    <Container>
      <Card className="text-center shadow my-2 mt-3 border">
        <Card.Header>Usuários Cadastrados e Ocorrências</Card.Header>
        <Card.Body>
          <Row className="align-center d-flex justify-content-center">
            <AiOutlineUser className="fs-1 mt-2" />
            <p className="fs-3 mt-2">{`${numUsers} usuários cadastrados`}</p>
            {numUsers > 0 && (
              <Button
                className="mb-1 bg-danger-subtle text-black border-danger"
                onClick={handleShow}
              >
                Mostrar mais
              </Button>
            )}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Usuários Cadastrados</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="filterDropdown">
                    Filtrar por: {filterType === "none" ? "Nenhum Filtro" : "Ocorrências por Usuário"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setFilterType("none")}>Nenhum Filtro</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFilterType("occurrences")}>Ocorrências por Usuário</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                {filteredUserList.length > 0 && (
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Segmento</th>
                        <th>Ocorrências</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUserList.map((user) => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.segment}</td>
                          <td>{user.ocorrencias}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Modal.Body>
            </Modal>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default QtdUsers;