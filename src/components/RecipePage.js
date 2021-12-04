/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Heart } from 'react-bootstrap-icons';
import { ListGroup, Card } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import { GlobalContext } from '../context/GlobalState';
import Header from './Header';

const RecipePage = () => {
  const params = useParams();
  const parsedIng = params.recipeIng.split(',');
  // const parsedInstr = params.recipeInstr.split(',');
  const [ytEmbed, setEmbed] = useState('');
  const [image, setImg] = useState('');

  const {
    favList,
    addRecipe,
    removeRecipe,
  } = useContext(GlobalContext);

  /*
  Displays the top recipe results to user
  The url for each recipe page will be unique followed by
  the some attributme (name)
  */
  const renderIngredients = () => parsedIng.map((ing) => (
    <div>
      <ListGroup.Item className="ingItem" bsPrefix="ingItem">
        {ing}
      </ListGroup.Item>
    </div>
  ));

  // const renderInstructions = () => parsedInstr.map((instr) => (
  //   <div>
  //     <ListGroup.Item as="li">
  //       {instr}
  //     </ListGroup.Item>
  //   </div>
  // ));

  function fetchFav(recipeList) {
    console.log('FETCH FAV', recipeList);
    fetch('/fav_list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipeList }),
    }).then((response) => response.json());
  }
  function fetchDelete(recipeName) {
    console.log('FETCH DELETE', recipeName);
    fetch('/fav_delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipeName }),
    }).then((response) => response.json());
  }

  function fetchYoutube(ytTitle) {
    fetch('/get_youtube', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ytTitle }),
    }).then((response) => response.json()).then((data) => {
      console.log(data.youtube_embed);
      setEmbed(data.youtube_embed);
      setImg(data.img);
    });
  }

  return (
    <div className="recipeBody">

      <Header fav={favList} />

      <div className="leftSide">
        <h2 className="recipeTitle"> {params.recipeName}</h2>
        <div class="btnContainer">

          <Button variant="outline-dark" className="favBtn" onClick={() => {
            favList.push(params.recipeName);
            addRecipe(params.recipeName);
            fetchFav(favList);
          }}>
            <Heart /> Add To Favs
          </Button>
        </div>
          <img className="recImg" src={image} alt="" />
        <div class="btnContainer">
          <Button variant="outline-dark" className="remBtn" onClick={() => {
            removeRecipe(params.recipeName);
            fetchDelete(params.recipeName);
          }
          }>
            <Heart background-color='black' /> Remove Favs
          </Button>
        </div>
        <div className="embed-responsive embed-responsive-16by9 ytContainer">
          {fetchYoutube(params.recipeName)}
          {ReactHtmlParser(ytEmbed)}
        </div>
      </div>

      <div className="rightSide">
        <div className="ingContainer">
          <Card className="ingCard" bsPrefix="ingCard">
            <Card.Title className="cardTitle" bsPrefix="cardTitle"> INGREDIENTS</Card.Title>
            <ListGroup className="ingGroup" bsPrefix="ingGroup" >
              {renderIngredients()}
            </ListGroup>
          </Card>
        </div>
        {/* <div className="ingContainer">
          <Card variant="ing">
            <Card.Header>
              INSTRUCTIONS
            </Card.Header>
            <ListGroup variant="flush">
              {renderInstructions()}
            </ListGroup>
          </Card>
        </div> */}
      </div>

    </div>
  );
};

export default RecipePage;
