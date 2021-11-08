import { Link, Outlet } from 'react-router-dom';
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
    /*
    Displays the top recipe results to user

    The url for each recipe page will be unique followed by
    the some attribute (name)
    */
  const renderResults = () => testData.map((recipe) => (
    <div>
        <div className="resultItem" >
            <Link
            to={`/recipeResults/${recipe.name}`}
            key={recipe.name}
            >
                {recipe.name}
            </Link>
        </div>
        <Outlet/>
    </div>
  ));

  return (
    <div className="mainBody">

        <Header />

        <div className="sliderContainer">
            <Slider slidesToShow={3} dots={true}>{renderSlides()}</Slider>
        </div>

        <div className="searchBar">
            <form action="">
            <input type="text" placeholder=" SEARCH RECIPES......." />
            </form>
        </div>

        <div className="resultList">
                {renderResults()}
        </div>
    </div>
  );
};

export default Main;
