import React, { useState, useEffect } from "react";
import { Button, Card, Container, Modal, Row, Table } from "react-bootstrap";
import { AiOutlineUser } from "react-icons/ai";

function QtdUsers() {
  const [show, setShow] = useState(false);
  const [numUsers, setNumUsers] = useState(0);
  const [userList, setUserList] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // Rota para obter a contagem de usuários
    fetch("http://localhost:8080/users/count")
      .then((response) => response.json())
      .then((countData) => {
        setNumUsers(countData.count);
      })
      .catch((error) => {
        console.error("Error fetching user count:", error);
      });

    // Rota para obter os detalhes da tabela users
    fetch("http://localhost:8080/users/id")
      .then((response) => response.json())
      .then((data) => {
        setUserList(data);
      })
      .catch((error) => {
        console.error("Error fetching users list:", error);
      });
  }, []);

  return (
    <Container>
      <Card className="text-center shadow my-2 mt-3 border">
        <Card.Header>Usuários Cadastrados</Card.Header>
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
