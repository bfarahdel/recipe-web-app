/* 
Each page has been broken down into seperate components
in order to user React Router
*/

import React from "react";
import './App.css';
import { Routes, Route } from "react-router-dom";
import RecipePage from './components/RecipePage'
import RecipeInfo from "./components/RecipeInfo";
import Main from "./components/Main";

function App() {  
 
  return (
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='recipeResults' element={<RecipePage />}>
          <Route path=':recipeName' element={<RecipeInfo />}/>  
        </Route>
      </Routes>   
  );

}

export default App;
