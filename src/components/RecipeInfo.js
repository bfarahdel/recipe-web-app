import { useParams } from "react-router-dom";

export default function RecipeInfo() {
    let params = useParams();

    return <h2>{params.recipeName}</h2>;
  }