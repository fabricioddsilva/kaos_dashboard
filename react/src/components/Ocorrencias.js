import React, { useState, useEffect } from "react";
import { Card, Container, Row } from "react-bootstrap";
import { AiOutlineFileProtect } from "react-icons/ai";

function Ocorrencias() {
  const [numOcorrencias, setNumOcorrencias] = useState(0);
  const [filterOption, setFilterOption] = useState("");

  useEffect(() => {
    const apiUrl = filterOption ? `http://localhost:8080/extracts?filter=${filterOption}` : "http://localhost:8080/extracts";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setNumOcorrencias(data.length);
      })
      .catch((error) => {
        console.error("Error fetching extract count:", error);
      });
  }, [filterOption]);

  return (
    <Container>
      <Card className="border text-center shadow my-2">
        <Card.Header>Contagem de Extracts</Card.Header>
        <Card.Body>
          <Row className="align-center d-flex justify-content-center">
            <AiOutlineFileProtect className="fs-1 mt-2" />
            <p className="fs-3 mt-2">{`Número de Ocorrências: ${numOcorrencias}`}</p>
            <div className="mb-1">
              <Button
                variant="danger-subtle"
                onClick={() => setFilterOption("pages_process")}
              >
                Filtrar por Páginas Processadas
              </Button>{" "}
              <Button
                variant="danger-subtle"
                onClick={() => setFilterOption("")}
              >
                Remover Filtros
              </Button>
            </div>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Ocorrencias;