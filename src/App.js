/*
Each page has been broken down into seperate components
in order to user React Router
*/

import './App.css';
import { useState } from 'react';

import { Routes, Route } from 'react-router-dom';
import RecipePage from './components/RecipePage';
import RecipeInfo from './components/RecipeInfo';
import Main from './components/Main';
import { GlobalProvider } from './context/GlobalState';

function App() {
  const args = JSON.parse(document.getElementById('data').text);
  const {
    recipeIds,
    recipeNames,
    recipeImgs,
    recipeIng,
    recipeInstr,
  } = args;
  console.log('(APP JS) ARGUMENTS AREEEE -', recipeIds,
    recipeNames,
    recipeImgs,
    recipeIng,
    recipeInstr);

  const [recipeYT, setYT] = useState([]);
  return (
    <GlobalProvider>
      <Routes>
        <Route path='/' element= {<Main ids={recipeIds} names={recipeNames} imgs={recipeImgs} setYt={setYT}/> }/>
        <Route path='recipeResults' element={<RecipePage ing={recipeIng} instr={recipeInstr} imgs={recipeImgs} yt={recipeYT}/>}>
          <Route path=':recipeName/:recipeIng/:recipeInstr' element={<RecipeInfo />}/>
        </Route>
      </Routes>
    </GlobalProvider>
  );
}

export default App;
