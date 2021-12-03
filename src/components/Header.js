/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import {
  Navbar, Nav, NavDropdown,
} from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import logo from '../img/logo.png';

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
            <Link to="/" className="navLink" bsPrefix="navLink">
              <Nav.Item className="navLinkName" bsPrefix="navLinkName">
                HOME
              </Nav.Item>
            </Link>
            <NavDropdown title="FAVS" className="favLink" bsPrefix="favLink" id="navbarScrollingDropdown">
              {all_saved_recipes.map((item, index) => {
                return <NavDropdown.Item key={index} href="#action/3.1">{item}</NavDropdown.Item>;
              })}
            </NavDropdown>
            <a href="/logout" className="navLink">LOGOUT</a>
          </Nav>
        </Navbar.Text>
      </Navbar>
    </div>
  );
}

export default Header;
