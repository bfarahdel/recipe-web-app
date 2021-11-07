import { useParams } from 'react-router-dom';

export default function RecipeInfo() {
  const params = useParams();

  return <h2>{params.recipeName}</h2>;
}
