
import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
function Navs() {
  return (
    <>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="#"><Link to="/movies">Movies</Link></Nav.Link>
<Nav.Link href="#">          <Link to="/admin">Admin</Link></Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    
  </>
  );
}

export default Navs;
