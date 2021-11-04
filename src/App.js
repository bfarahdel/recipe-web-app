import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import './App.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {

  const renderSlides = () =>
    [1, 2, 3, 4, 5, 6, 7, 8].map(num => (
      <div className="carousel">
        <div className="savedItem">
          <h3>Slide {num}</h3>
        </div>
      </div>
    ));

  return (
    <div className="mainBody">

      <h1>  RECIPE FINDER </h1>
      <div className="sliderContainer">
        <Slider slidesToShow={3} dots={true}>{renderSlides()}</Slider>
      </div>
      
    </div>
    );

}

export default App;
