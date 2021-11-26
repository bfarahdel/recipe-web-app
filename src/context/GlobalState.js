import { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';
from vars import db;


const initialState = {
  favList: localStorage.getItem('favList') ? JSON.parse(localStorage.getItem('favList'))
    : [],
  // favList: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
  // global state for the user's favorite list
  const [state, dispatch] = useReducer(AppReducer, initialState);
  console.log('fav list STATEE', state.favList);

  useEffect(() => {
   
  }, [state]);

  // Function that gets called when user presses 'Add to Fav' button
  const addRecipe = (recipe) => {
    dispatch({ type: 'ADD_RECIPE_TO_FAV', payload: recipe });
  };

  const removeRecipe = (id) => {
    dispatch({ type: 'REMOVE_RECIPE_FROM_FAV', payload: id });
  };

  return (
    <GlobalContext.Provider
      value={{ favList: state.favList, addRecipe, removeRecipe }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
