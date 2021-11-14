import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Heart } from 'react-bootstrap-icons';
import { ListGroup, Card } from 'react-bootstrap';
import Header from './Header';

const RecipePage = () => {
  const params = useParams();
  console.log('PARAMSSSS', params);
  const parsedIng = params.recipeIng.split(',');
  const parsedInstr = params.recipeInstr.split(',');

  /*
  Displays the top recipe results to user

  The url for each recipe page will be unique followed by
  the some attribute (name)
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
      <Header />
      <h2 className="recipeTitle">RECIPE PAGE {params.recipeName}</h2>
      <div className="leftSide">
        <div class="btnContainer">
          <Button variant="outline-dark" className="favBtn">
            <Heart /> Add To Favs
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
