import NavbarHome from "../components/NavbarHome";
import ContainerSup from "../components/ContainerSup";
import QtdUsersData from "../components/QtdUsersData";
import GraficoDocType from "../components/GraficoDocType";
import GraficoSegmentos from "../components/GraficoSegmentos";
import { Col, Container, Figure, Row } from "react-bootstrap";
import logo from '../imgs/BackgroundEraser_20231112_212322950.png'

function Home(){
    return(
        <>
        <NavbarHome />
        <ContainerSup />
        <QtdUsersData />
        <Container className='d-flex justify-content-center align-center'>
          <Row className='d-flex justify-content-center align-center container gap-3 mt-4'>
            <Col className= 'd-flex justify-content-center align-center shadow pb-2 rounded-2 border'>
              <GraficoDocType />
            </Col>
              <Col className= 'd-flex justify-content-center align-center border rounded-2 shadow pb-2'>
                  <GraficoSegmentos/>
              </Col>
          </Row>
        </Container>
        <Figure className='d-flex justify-content-center align-center my-4'>
          <Figure.Image
            width={450}
            height={420}
            alt= "logo"
            src= {logo}
            />
        </Figure>
        </>
    );
};

export default Home;