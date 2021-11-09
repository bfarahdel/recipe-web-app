import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from './Header';

const Main = () => {
// renders each individual slide/recipe inside the Slider component
// and maps it based off of array
  const renderSlides = () => [1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
    <div className="carousel">
      <div className="savedItem">
          <h3>Slide {num}</h3>
      </div>
    </div>
  ));

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
  const [favorites, setFavorites] = useState([]);
  const [currSearch, setSearch] = useState([]);

  function addFav(favId) {
    const favList = [...favorites];
    favList.push(favId);
    setFavorites(favList);
  }

  // function deleteId(favId) {
  //   const favList = [...favorites];
  //   favList.splice(favId, 1);
  //   setFavorites(favList);
  // }

  /*
  Displays the top recipe results to user

  The url for each recipe page will be unique followed by
  the some attribute (name)
  */
  const renderResults = () => testData.map((recipe) => (
    <div>
      <ListGroup.Item as="li">
        <div className="resultItem" >
              <Link
              to={`/recipeResults/${recipe.name}`}
              key={recipe.name}
              >
                  {recipe.name}
              </Link>
          </div>
        <Outlet/>
      </ListGroup.Item>
    </div>
  ));

  function submitSearch(recipeName) {
    fetch('/addRecipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipeName }),
    }).then((response) => response.json()).then((data) => {
      console.log(data);
    });
    // setTimeout(() => { window.location.reload(false); }, 2400);
  }

  // const args = JSON.parse(document.getElementById('data').text);

  return (
    <div className="mainBody">
        {/* <h1>{args.recipeName[0]}</h1> */}
        <Header />

        <div className="sliderContainer">
            <Slider slidesToShow={3} dots={true}>{renderSlides()}</Slider>
        </div>

        <div className="searchBar">
            {/* <form action=""> */}
              <input
              type="text"
              placeholder=" SEARCH RECIPES......."
              value={currSearch}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addFav(currSearch);
                setSearch('');
                submitSearch(currSearch);
              }
            }}
            />
            {/* </form> */}
        </div>

        <div className="resultList">
          <ListGroup as="ol" numbered>
            {renderResults()}
          </ListGroup>
        </div>
    </div>
  );
};

export default Main;
