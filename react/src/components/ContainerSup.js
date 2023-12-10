import { Col, Container, Row } from "react-bootstrap";

function ContainerSup(){
    return(
        <Container fluid className='bg-dark py-4 d-flex justify-content-center align-center' border="danger-subtle">
            <Row className= 'align-center ms-1'>
              <Col>
                <Row className= 'text-white fs-2 fw-bold ms-2'>
                    <p>Dashboard</p>
                </Row>
                    <Row className= 'text-white fs-3'>
                        <p>Análise de dados</p>
                    </Row>
              </Col>
            </Row>
        </Container>
    )
}

export default ContainerSup;