import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../NavBar.css';

function NavbarHome() {
  return (
    <>
      <Navbar expand="lg" className='navegacao'>
      <Container className='container-fluid gap-3 ms-2'>
        <Navbar.Brand href="#home" className='text-white fs-3 fw-bold'>Di2Win</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="gap-3">
            <Nav.Link href="#home" className='fs-4 text-white'>Home</Nav.Link>
            <Nav.Link href="#graficos" className='fs-4 text-white'>Contatos</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default NavbarHome;