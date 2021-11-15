import { useState, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GlobalContext } from '../context/GlobalState';

import Header from './Header';

function Main(props) {
  const { ids, names, imgs } = props;
  let { favList } = useContext(GlobalContext);
  if (favList.length < 1) {
    favList = ['ADD A RECIPE'];
  }
  console.log('(MAIN JS) PROPS id:', ids, 'names', names, 'imgs: ', imgs);
  console.log(' MAINNNN FAV LIST ', favList);

  const test = favList;
  // renders each individual slide/recipe inside the slider component
  // and maps it based off of favortes
  const renderSlides = () => test.map((fav) => (
    <div className="carousel">
      <div className="savedItem">
          <h3> {fav}</h3>
      </div>
    </div>
  ));

  const [currSearch, setSearch] = useState([]);
  const [recipeIds, setIds] = useState([]);
  const [recipeNames, setNames] = useState([]);
  const [recipeImgs, setImgs] = useState([]);
  const [recipeInstr, setInstr] = useState([]);
  const [recipeIng, setIng] = useState([]);

  console.log('RECIPE NAMES - ', recipeNames);
  console.log('RECIPE IMGS - ', recipeImgs);

  console.log('RECIPE IDS - ', recipeIds);

  console.log('RECIPE Instr - ', recipeInstr);
  console.log('RECIPE IDS - ', recipeIng);

  const dataInfo = {
    recipe: [{
      recipeName: recipeNames[0],
      recipeIng: recipeIng[0],
      recipeInstr: recipeInstr[0],
    }],
  };
  console.log('INFO', dataInfo);

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < 5; i++) {
    dataInfo.recipe.push({
      recipeName: recipeNames[i],
      recipeIng: recipeIng[i],
      recipeInstr: recipeInstr[i],
    });
  }
  console.log('INFO', dataInfo);

  /*
  Displays the top recipe results to user
  The url for each recipe page will be unique url/$recipeName
  */
  const renderResults = () => dataInfo.recipe.map((recipe) => (
    <div>
      <ListGroup.Item as="li">
        <div className="resultItem" >
              <Link
              to={`/recipeResults/${recipe.recipeName}/${recipe.recipeIng}/${recipe.recipeInstr}`}
              key={recipe.recipeName}
              >
                  {recipe.recipeName}
              </Link>
          </div>
        <Outlet/>
      </ListGroup.Item>
    </div>
  ));

  // Fetch function used to retreive the information from the
  // searched recipe
  function submitSearch(recipeName) {
    fetch('/add_recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipe: recipeName }),
    }).then((response) => response.json()).then((data) => {
      // Sets all of the recipe info states

      setIds(data.recipe_ids);
      setNames(data.recipe_names);
      setImgs(data.recipe_imgs);
      setInstr(data.recipe_instructions);
      setIng(data.recipe_ing);

      console.log('(data) IDS-  ', data.recipe_ids);
      console.log('(data) NAMES-  ', data.recipe_names);
      console.log('(data) IMGS-  ', data.recipe_imgs);
    });
  }

  return (
    <div className="mainBody">
        <Header />

        <div className="sliderContainer">
            <Slider slidesToShow={3} dots={true}>{renderSlides()}</Slider>
        </div>

        <div className="searchBar">
              <input
              type="text"
              placeholder=" SEARCH RECIPES......."
              value={currSearch}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                setSearch('');
                submitSearch(currSearch);
              }
            }}
            />
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
