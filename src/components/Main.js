import { useState, useContext, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Heart } from 'react-bootstrap-icons';
import { GlobalContext } from '../context/GlobalState';
import bg from '../img/bgg.png';
// import block from '../img/block.png';

import Header from './Header';

function Main(props) {
  const { ids, names, imgs } = props;
  let { favList } = useContext(GlobalContext);
  const { recipeLink } = useContext(GlobalContext);
  // if (favList.length < 1) {
  //   favList = ['ADD A RECIPE'];
  // }
  const args = JSON.parse(document.getElementById('data').text);
  const savedRecipes = args.savedRecipe;

  const [currSearch, setSearch] = useState([]);
  const [recipeId, setId] = useState([]);
  const [recipeNames, setNames] = useState([]);
  const [recipeImg, setImgs] = useState([]);
  const [recipeInstr, setInstr] = useState([]);
  const [recipeIng, setIng] = useState([]);
  // const [savedList, setSaved] = useState([]);

  console.log('(MAIN JS) PROPS id:', ids, 'names', names, 'imgs: ', imgs);
  console.log(' RECIPE LINK  ', recipeLink);

  useEffect(() => {
    if (savedRecipes.length > 0) {
      for (let i = 0; i < savedRecipes.length; i += 1) {
        favList[i] = savedRecipes[i];
      }
      console.log('FAV LIST in effect ', favList);
    } else {
      favList = ['ADD A RECIPE'];
      console.log('saved list is empty');
    }
  }, []);

  console.log('SAVED LIST', savedRecipes);

  console.log('Current FAV LIST ', favList);

  // const checkData = (data) => console.log('SLIDE DATA ', data);
  // renders each individual slide/recipe inside the slider component
  // and maps it based off of favortes
  const renderSlides = () => favList.map((fav) => (
    <div className="carousel">
      <div className="savedItem">
        <div className="favImg">
          <img src="https://www.slrlounge.com/wp-content/uploads/2016/03/monikawalecka-1.jpg" alt="" />
        </div>
      <Link to="/" className="favLink" bsPrefix="favLink">
        <h3 className="favName"> {fav}</h3>
      </Link>
      </div>
    </div>
  ));

  console.log('RECIPE NAMES - ', recipeNames);
  console.log('RECIPE IMGS - ', recipeImg);

  console.log('RECIPE IDS - ', recipeId);

  console.log('RECIPE Instr - ', recipeInstr);
  console.log('RECIPE IDS - ', recipeIng);

  const dataInfo = {
    recipe: [{
      recipeId: recipeId[0],
      recipeName: recipeNames[0],
      recipeIng: recipeIng[0],
      recipeInstr: recipeInstr[0],
      recipeImg: recipeImg[0],
    }],
  };
  console.log('INFO', dataInfo);

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < 5; i++) {
    dataInfo.recipe.push({
      recipeId: recipeId[i],
      recipeName: recipeNames[i],
      recipeIng: recipeIng[i],
      recipeInstr: recipeInstr[i],
      recipeImg: recipeImg[i],
    });
  }
  console.log('INFO', dataInfo);

  /*
  Displays the top recipe results to user
  The url for each recipe page will be unique url/$recipeName
  */
  const renderResults = () => dataInfo.recipe.map((recipe) => (
    <div>
      <ListGroup.Item className="recipeGroup" bsPrefix="recipeGroup">
        <div className="resultItem" >
              <div className="recipeImg">
                <img src={recipe.recipeImg} alt="" />
              </div>
              <Link
              className="recipeLink" bsPrefix="recipeLink"
              to={`/recipeResults/${recipe.recipeId}/${recipe.recipeName}/${recipe.recipeIng}/${recipe.recipeInstr}`}
              key={recipe.recipeId}
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

      setId(data.recipe_ids);
      setNames(data.recipe_names);
      setImgs(data.recipe_imgs);
      setInstr(data.recipe_instructions);
      setIng(data.recipe_ing);
      // setSaved(data.recipeNames_LIST);
      // console.log('saved recipes', savedList);
    });
  }

  return (
    <div className="mainBody">
        <Header fav = {favList} />

        <div className="banner">
          <div className="leftBanner">

            <div className="bannerText">
              <h2>Stop <span className="textColor">Looking</span> and</h2>
              <h2 className="start">Start <span className="textColor">Cooking</span> </h2>
            </div>
          </div>
          <div className="rightBanner">
            <img className="bannerImg" src={bg} alt="" />
          </div>
        </div>

        <div className="sliderContainer">
            <div className="sliderTitle">
                <h1> <Heart color="#af2a2a"/>  YOUR FAVORITES  </h1>
            </div>
            {/* <div className="slide">
              {renderSlides()}
            </div> */}
            <Slider className="slide" bsPrefix="slide" slidesToShow={5} dots={true}>
              {renderSlides()}
            </Slider>
        </div>

        <div className="searchBar">
        <i class="bi bi-search"></i>
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
          <ListGroup className="listItems" bsPrefix="listItems" as="ul" >
            {renderResults()}
          </ListGroup>
        </div>
    </div>
  );
}

export default Main;
