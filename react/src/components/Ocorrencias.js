import { useEffect, useState } from "react";
import { Card, Container, Row } from "react-bootstrap";
import { AiOutlineFileProtect } from "react-icons/ai";

function Ocorrencias() {
  const [numOcorrencias, setNumOcorrencias] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/extracts")
      .then((response) => response.json())
      .then((data) => {
        setNumOcorrencias(data.length);
      })
      .catch((error) => {
        console.error("Error fetching extract count:", error);
      });
  }, []);

  return (
    <Container>
        <Card className="border text-center shadow my-2">
        <Card.Header>Contagem de Extracts</Card.Header>
        <Card.Body>
        <Row className="align-center d-flex justify-content-center">
            <AiOutlineFileProtect className="fs-1 mt-2" />
            <p className="fs-3 mt-2">{`Número de Ocorrencias: ${numOcorrencias}`}</p>
        </Row>
        </Card.Body>
        </Card>
    </Container>
  );
}

export default Ocorrencias;
