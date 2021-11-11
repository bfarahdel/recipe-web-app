import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from './Header';

function Main(props) {
  // if (JSON.parse(document.getElementById('data').text)):
  const { ids, names, imgs } = props;

  console.log('(MAIN JS) PROPS id:', ids, 'names', names, 'imgs: ', imgs);
  // renders each individual slide/recipe inside the slider component
  // and maps it based off of array
  const renderSlides = () => [1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
    <div className="carousel">
      <div className="savedItem">
          <h3>Slide {num}</h3>
      </div>
    </div>
  ));
  // const testData = ['pizza', 'pizza2', 'pizza3', 'pizza4'];

  const [favorites, setFavorites] = useState([]);
  const [currSearch, setSearch] = useState([]);
  // const [recipeIds, setIds] = useState([]);
  const [recipeNames, setNames] = useState([]);
  // const [recipeImgs, setImgs] = useState([]);

  function addFav(favId) {
    const favList = [...favorites];
    favList.push(favId);
    setFavorites(favList);
  }

  console.log('RECIPE NAMES - ', recipeNames);
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
  const renderResults = () => recipeNames.map((recipe) => (
    <div>
      <ListGroup.Item as="li">
        <div className="resultItem" >
              <Link
              to={`/recipeResults/${recipe}`}
              key={recipe}
              >
                  {recipe}
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
      body: JSON.stringify({ recipe: recipeName }),
    }).then((response) => response.json()).then((data) => {
      // setIds(data.recipeIds);
      setNames(data.recipeNames);
      // setImgs(data.recipeImgs);

      console.log('(data) NAMES-  ', data.recipeNames);
      // console.log('ids-  ', data.recipeIds);
      // console.log('img-  ', data.recipeImgs);
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
}

export default Main;
