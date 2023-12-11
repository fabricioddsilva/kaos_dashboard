import React, { useState, useEffect } from "react";
import { Button, Card, Modal, Row, Nav, Tab, Table } from "react-bootstrap";
import { AiOutlineUser } from "react-icons/ai";

function QtdUsersData() {
  const [show, setShow] = useState(false);
  const [numUsers, setNumUsers] = useState(0);
  const [userList, setUserList] = useState([]);
  const [extractsList, setExtractsList] = useState([]);
  const [activeTab, setActiveTab] = useState("#user-data");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => {
        setNumUsers(data.length);
        setUserList(data);
      })
      .catch((error) => {
        console.error("Error fetching user list:", error);
      });
    fetch("/api/extracts")
      .then((response) => response.json())
      .then((data) => {
        setExtractsList(data);
      })
      .catch((error) => {
        console.error("Error fetching extracts list:", error);
      });
  }, []);

  return (
    <>
      <Card className="text-center shadow my-2 border">
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
                <Modal.Title>Usuários</Modal.Title>
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

      <Card className="text-center shadow my-2 border">
        <Card.Header>
          <Nav fill variant="tabs" activeKey={activeTab}>
            <Nav.Item>
              <Nav.Link
                className= "bg-danger-subtle"
                href="#user-data"
                onClick={() => setActiveTab("#user-data")}>
                Dados do Usuário
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className= "bg-danger-subtle"
                href="#extracts-data"
                onClick={() => setActiveTab("#extracts-data")}>
                Ocorrencias
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Tab.Content>
            <Tab.Pane eventKey="#user-data">
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
            </Tab.Pane>
            <Tab.Pane eventKey="#extracts-data">
              {numUsers > 0 && (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID Extracts</th>
                      <th>Pages Process</th>
                      <th>Tipo de Documento</th>
                      <th>ID Usuário</th>
                    </tr>
                  </thead>
                  <tbody>
                    {extractsList.map((extract) => (
                      <tr key={extract.id}>
                        <td>{extract.id}</td>
                        <td>{extract.pages_process}</td>
                        <td>{extract.doc_type}</td>
                        <td>{extract.user_id}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Tab.Pane>
          </Tab.Content>
        </Card.Body>
      </Card>
    </>
  );
}

export default QtdUsersData;