/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import {
  Navbar, Nav, NavDropdown,
} from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import logo from '../img/logo.png';

function Header(props) {
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
  const args = JSON.parse(document.getElementById('data').text);
  const all_saved_recipes = args.savedRecipe;

  return (
    <div>
      <Navbar collapseOnSelect bg="light" expand="xl" style={{
        maxHeight: '120px',
        backgroundColor: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.19) 0px 6px 12px, rgba(0, 0, 0, 0.23) 0px 4.5px 4.5px',
      }}>
        <Link className="navLink" to='/'>
          <Navbar.Brand>
            <img className="logoImg" src={logo} alt="" />
          </Navbar.Brand>
        </Link>
        <Navbar.Text expand='lg' className="justify navText" bsPrefix="navText">
          <Nav
            className="me-auto my-2 my-lg-3 justify-content-end"
            style={{ maxHeight: '170px' }}
            navbarScroll
          >
            <a href="/" className="navLink">HOME</a>

            {/* <Link to="/" className="navLink" bsPrefix="navLink">
              <Nav.Item className="navLinkName" bsPrefix="navLinkName">
                HOME
              </Nav.Item>
            </Link> */}
            <a href="/logout" className="navLink">LOGOUT</a>
          </Nav>
        </Navbar.Text>
      </Navbar>
    </div>
  );
}

export default Header;
