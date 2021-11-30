import {
  Navbar, Nav, NavDropdown,
} from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';

function Header(props) {
  let favList = [];
  // Test data to mimick data from API
  if ((props.fav) === undefined) {
    favList = ['ADD A RECIPE'];
  } else {
    favList = props.fav;
  }
  console.log('HEADER PROPS ', props.fav, 'HEADER FAV LIST', favList);
  // const testData = [
  //   {
  //     name: 'PIZZA',
  //     calores: 550,
  //   },
  //   {
  //     name: 'NY PIZZA',
  //     calories: 200,
  //   },
  //   {
  //     name: 'DEEP DISH PIZZA',
  //     calories: 203,
  //   },
  // ];
  // Renders each Drop downn item for the favorites tab as Links
  const renderFavs = () => props.fav.map((fav) => (
    <NavDropdown.Item as="li" href="">
      <div className="resultItem" >

        <Link
          to={`/recipeResults/${fav.name}`}
          key={fav.name}
        >
          {fav.name}
        </Link>

      </div>
      <Outlet />
    </NavDropdown.Item>
  ));

  return (
    <div>
      <Navbar collapseOnSelect bg="light" expand="xl" className="navBar">
        <Link to='/'>
          <Navbar.Brand className="navTitle">
            <h1>
              RECIPE FINDER
            </h1>
          </Navbar.Brand>
        </Link>
        <Navbar.Text expand='lg' className="justify">
          <Nav
            className="me-auto my-2 my-lg-3 alignRight"
            style={{ maxHeight: '170px' }}
            navbarScroll
          >
            <Link to="/" className="navLink">HOME</Link>
            <NavDropdown title="FAVS" className="navLink" id="navbarScrollingDropdown">
              {renderFavs()}
            </NavDropdown>
            <Link to="/" className="navLink">
              PROFILE
            </Link>
            <a href="/logout" className="navLink">
              LOGOUT
            </a>
          </Nav>
        </Navbar.Text>
      </Navbar>
    </div>
  );
}

export default Header;
