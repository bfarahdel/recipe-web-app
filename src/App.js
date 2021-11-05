import React, { useState, useEffect } from "react";
import './App.css';
import Slider from "react-slick";
import { BrowserRouter as Router,Route, Switch, Link} from "react-router-dom";
import RecipePage from './RecipePage'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
// renders each individual slide/recipe inside the Slider component
// and maps it based off of array 
  const renderSlides = () =>
    [1, 2, 3, 4, 5, 6, 7, 8].map(num => (
      <div className="carousel">
        <div className="savedItem">
          <h3>Slide {num}</h3>
        </div>
      </div>
        
    ));
  // function onClickRecipe() {

  // }
    // where we display the top recipe results
  const renderResults = () => 
      ['PIZZA', 'PIZZA2', 'PIZZA3','PIZZA4', 'PIZZA5'].map(recipe => (
          <div className="resultItem" >
            {/* <Route path='/recipeResult'>  */}
              <h1>{recipe}</h1>
              {/* <RecipePage /> */}
            {/* </Route> */}
          </div>
      ));

  return (
    <div className="mainBody">

      <h1>  RECIPE FINDER </h1>

      <div className="sliderContainer">
        <Slider slidesToShow={3} dots={true}>{renderSlides()}</Slider>
      </div>

      <div className="searchBar">
        <form action="">
          <input type="text" placeholder=" SEARCH RECIPES......." />
        </form>
      </div>
      <Router> 
        <div className="resultList">
            {/* <Route path='/recipeResult'> */}
              {renderResults()}
            {/* </Route>           */}
        </div>
      </Router>
    </div>
    );

}
function recipeResult () {
  return <h1>recipe</h1>
}

export default App;
