import React, { useState, useEffect } from "react";
import { Button, Card, Container, Modal, Row, Table } from "react-bootstrap";
import { AiOutlineUser } from "react-icons/ai";

function QtdUsersData() {
  const [show, setShow] = useState(false);
  const [numUsers, setNumUsers] = useState(0);
  const [oldestUserData, setOldestUserData] = useState({ name: "", registrationDate: "" });
  const [userList, setUserList] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch("/api/users/count")
      .then((response) => response.json())
      .then((data) => {
        setNumUsers(data.count);
      })
      .catch((error) => {
        console.error("Error fetching user count:", error);
      });

    fetch("/api/users/oldestUserData")
      .then((response) => response.json())
      .then((data) => {
        setOldestUserData({ name: data.name, registrationDate: data.registrationDate });
      })
      .catch((error) => {
        console.error("Error fetching oldest user data:", error);
      });

    fetch("/api/users/list")
      .then((response) => response.json())
      .then((data) => {
        setUserList(data);
      })
      .catch((error) => {
        console.error("Error fetching user list:", error);
      });
  }, []);

  return (
    <>
      <Card className="text-center shadow my-3 border">
        <Card.Header>Usuarios Cadastrados</Card.Header>
        <Card.Body>
          <Row className="align-center d-flex justify-content-center">
            <AiOutlineUser className="fs-1 mt-2" />
            <p className="fs-3 mt-2">{`${numUsers} usuários cadastrados`}</p>
          </Row>
        </Card.Body>
      </Card>
      <Card className="text-center shadow border">
        <Card.Header>Data de cadastro dos usuários</Card.Header>
        <Card.Body>
          <p className="fs-3 py-2">{`Usuario mais antigo cadastrado: ${oldestUserData.name} ${oldestUserData.registrationDate}`}</p>
          {numUsers > 0 && (
            <Button className="mb-1 bg-danger-subtle text-black border-danger" onClick={handleShow}>
              Mostrar mais
            </Button>
          )}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Usuários</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {numUsers > 0 && (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Primeiro nome</th>
                      <th>Ultimo Nome</th>
                      <th>Data de cadastro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.registrationDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Modal.Body>
          </Modal>
        </Card.Body>
      </Card>
    </>
  );
}

export default QtdUsersData;