/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Heart } from 'react-bootstrap-icons';
import { ListGroup, Card } from 'react-bootstrap';
import { GlobalContext } from '../context/GlobalState';
import Header from './Header';

const RecipePage = () => {
  const params = useParams();
  console.log('PARAMSSSS', params);
  const parsedIng = params.recipeIng.split(',');
  const parsedInstr = params.recipeInstr.split(',');

  const {
    favList, addRecipe, removeRecipe, username,
  } = useContext(GlobalContext);

  console.log('RECIPE PAGE FAV ', favList);

  /*
  Displays the top recipe results to user

  The url for each recipe page will be unique followed by
  the some attributme (name)
  */
  const renderIngredients = () => parsedIng.map((ing) => (
    <div>
      <ListGroup.Item as="li">
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

  return (
    <div className="recipeBody">
      <Header fav={favList} />
      <h2 className="recipeTitle">RECIPE PAGE {params.recipeName}</h2>
      <div className="leftSide">
        <div class="btnContainer">

          <Button variant="outline-dark" className="favBtn" onClick ={() => addRecipe(params.recipeName, username) }>
            <Heart /> Add To Favs
          </Button>
        </div>

        <div class="btnContainer">
        <Button variant="outline-dark" className="remBtn" onClick ={() => removeRecipe(params.id)}>
            <Heart background-color ='black'/> Remove Favs
          </Button>
        </div>
        <div className="embed-responsive embed-responsive-16by9 ytContainer">
          <iframe title="Embeds Page" className="embed-responsive-item yt" src="https://www.youtube.com/embed/v674KOxKVLVg"
            allowfullscreen></iframe>
        </div>
      </div>

      <div className="rightSide">
        <div className="ingContainer">
          <Card variant="ing">
            <Card.Header>
              INGREDIENTS
            </Card.Header>
            <ListGroup variant="flush">
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
