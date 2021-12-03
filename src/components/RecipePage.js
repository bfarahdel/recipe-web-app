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
  console.log('PARAMSSSS', params);
  const parsedIng = params.recipeIng.split(',');
  const parsedInstr = params.recipeInstr.split(',');
  const [ytEmbed, setEmbed] = useState('');

  const {
    favList,
    addRecipe,
    addLink,
    removeRecipe,
  } = useContext(GlobalContext);
  const currUrl = `/recipeResults/${params.recipeName}/${params.recipeIng}/${params.recipeInstr}`;
  console.log('RECIPE PAGE FAV ', favList);

  /*
  Displays the top recipe results to user

  The url for each recipe page will be unique followed by
  the some attributme (name)
  */
  const renderIngredients = () => parsedIng.map((ing) => (
    <div>
      <ListGroup.Item className="ingGroup" bsPrefix="ingGroup">
        {ing}
      </ListGroup.Item>
    </div>
  ));

  const renderInstructions = () => parsedInstr.map((instr) => (
    <div>
      <ListGroup.Item as="li">
        {instr}
      </ListGroup.Item>
    </div>
  ));

  function fetchFav(recipeList) {
    console.log(recipeList);
    fetch('/fav_list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipeList }),
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
    });
  }

  return (
    <div className="recipeBody">
      <Header fav={favList} />
      <div className="leftSide">
        <h2 className="recipeTitle"> {params.recipeName}</h2>
        <div class="btnContainer">

          <Button variant="outline-dark" className="favBtn" onClick={() => {
            addRecipe(params.recipeName);
            addLink(currUrl);
            fetchFav(favList);
          }
          }>
            <Heart /> Add To Favs
          </Button>
        </div>

        <div class="btnContainer">
          <Button variant="outline-dark" className="remBtn" onClick={() => removeRecipe(params.id)}>
            <Heart background-color='black' /> Remove Favs
          </Button>
        </div>
        <div className="embed-responsive embed-responsive-16by9 ytContainer">
          {fetchYoutube(params.recipeName)}
          {ReactHtmlParser(ytEmbed)}
        </div>
      </div>

      {/* <div className="blockContainer"> */}
        {/* <img className="recipeBlock" src={} alt="" /> */}
      {/* </div> */}

      <div className="rightSide">
        <div className="ingContainer">
          <Card className="ingCard" bsPrefix="ingCard">
            <ListGroup >
              {renderIngredients()}
            </ListGroup>
          </Card>
        </div>
        <div className="ingContainer">
          <Card variant="ing">
            <Card.Header>
              INSTRUCTIONS
            </Card.Header>
            <ListGroup variant="flush">
              {renderInstructions()}
            </ListGroup>
          </Card>
        </div>
      </div>

    </div>
  );
};

export default RecipePage;
