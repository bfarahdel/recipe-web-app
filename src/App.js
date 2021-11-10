/*
Each page has been broken down into seperate components
in order to user React Router
*/

import './App.css';
import { Routes, Route } from 'react-router-dom';
import RecipePage from './components/RecipePage';
import RecipeInfo from './components/RecipeInfo';
import Main from './components/Main';

function App() {
  const args = JSON.parse(document.getElementById('data').text);
  const { recipeIds, recipeNames, recipeImgs } = args;
  console.log('(APP JS) ARGUMENTS AREEEE -', recipeIds, recipeNames, recipeImgs);
  // ids={recipeIds} names={recipeNames} imgs={recipeImgs}
  return (
      <Routes>
        <Route path='/' element= {<Main ids={recipeIds} names={recipeNames} imgs={recipeImgs}/> }/>
        <Route path='recipeResults' element={<RecipePage />}>
          <Route path=':recipeName' element={<RecipeInfo />}/>
        </Route>
      </Routes>
  );
}

export default App;
