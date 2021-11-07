import React from 'react'
import { useParams } from "react-router-dom";


const RecipePage =() => {
    let params = useParams();
    return (
        <div style={{ display: "flex" }}>
            <h2>RECIPE PAGE {params.recipeName}</h2>
        </div>
    )
};

export default RecipePage;
