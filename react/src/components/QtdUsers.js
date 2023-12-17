import React, { useState, useEffect } from "react";
import { Card, Container, Row, Button, Modal, Table } from "react-bootstrap";
import { AiOutlineUser } from "react-icons/ai";

function QtdUsers() {
  const [numUsers, setNumUsers] = useState(0);
  const [userList, setUserList] = useState([]);
  const [filterOption, setFilterOption] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then((response) => response.json())
      .then((countData) => {
        setNumUsers(countData.length);
      })
      .catch((error) => {
        console.error("Error fetching user count:", error);
      });

    const apiUrl = filterOption ? `http://localhost:8080/users?filter=${filterOption}` : "http://localhost:8080/users";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setUserList(data);
      })
      .catch((error) => {
        console.error("Error fetching users list:", error);
      });
  }, [filterOption]);

  return (
    <Container>
      <Card className="text-center shadow my-2 mt-3 border">
        <Card.Header>Usuários Cadastrados</Card.Header>
        <Card.Body>
          <Row className="align-center d-flex justify-content-center">
            <AiOutlineUser className="fs-1 mt-2" />
            <p className="fs-3 mt-2">{`${numUsers} usuários cadastrados`}</p>
            <div className="mb-1">
              <Button
                variant="danger-subtle"
                onClick={() => setFilterOption("name")}
              >
                Filtrar por Nome
              </Button>{" "}
              <Button
                variant="danger-subtle"
                onClick={() => setFilterOption("segment")}
              >
                Filtrar por Segmento
              </Button>{" "}
              <Button
                variant="danger-subtle"
                onClick={() => setFilterOption("")}
              >
                Remover Filtros
              </Button>
            </div>
            {numUsers > 0 && (
              <Button
                className="mb-1 bg-danger-subtle text-black border-danger"
                onClick={() => setShow(true)}
              >
                Mostrar mais
              </Button>
            )}
            <Modal show={show} onHide={() => setShow(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Usuários Cadastrados</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {numUsers > 0 && (
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Segmento</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userList.map((user) => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.segment}</td>
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