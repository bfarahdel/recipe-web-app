import { Navbar, Nav } from 'react-bootstrap';

function Header() {
  return (
    <div>
      <Navbar collapseOnSelect bg="light" expand="xl" className="navBar">
          <Navbar.Brand href="#" className="navTitle">
            <h1>
            RECIPE FINDER
            </h1>
          </Navbar.Brand>
            <Navbar.Text expand='lg' className="justify">
              <Nav
                className="me-auto my-2 my-lg-3 alignRight"
                style={{ maxHeight: '170px' }}
                navbarScroll
              >
                <Nav.Link href="" className="navLink">HOME</Nav.Link>
                <Nav.Link title="FAVS" className="navLink" id="navbarScrollingDropdown">
                FAVS
                </Nav.Link>
                <Nav.Link href="#" className="navLink">
                  PROFILE
                </Nav.Link>
              </Nav>
            </Navbar.Text>
      </Navbar>
    </div>
  );
}

export default Header;
