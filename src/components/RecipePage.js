import React from 'react';
import { useParams } from 'react-router-dom';

const RecipePage = () => {
  const params = useParams();
  return (
    <div>
        <h2>RECIPE PAGE {params.recipeName}</h2>
    </div>
  );
};

export default RecipePage;
