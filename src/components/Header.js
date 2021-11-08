import {
  Navbar, Nav, NavDropdown,
} from 'react-bootstrap';

function Header() {
  const testData = [
    {
      name: 'PIZZA',
      calores: 550,
    },
    {
      name: 'NY PIZZA',
      calories: 200,
    },
    {
      name: 'DEEP DISH PIZZA',
      calories: 203,
    },
  ];

  const renderFavs = () => testData.map((fav) => (
    <NavDropdown.Item as="li" href="">{fav.name}</NavDropdown.Item>
  ));

  return (
    <div>
      <Navbar collapseOnSelect bg="light" expand="xl" className="navBar">
        {/* <Container fluid> */}
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
                <NavDropdown title="FAVS" className="navLink" id="navbarScrollingDropdown">
                  {renderFavs()}
                </NavDropdown>
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
