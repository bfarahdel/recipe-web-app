import { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  favList: [],
  recipeLink: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
  // global state for the user's favorite list
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Function that gets called when user presses 'Add to Fav' button
  const addRecipe = (recipe) => {
    dispatch({ type: 'ADD_RECIPE_TO_FAV', payload: recipe });
  };

  const addLink = (link) => {
    console.log('LINK', link);
    dispatch({ type: 'ADD_LINK', payload: link });
  };

  const removeRecipe = (id) => {
    dispatch({ type: 'REMOVE_RECIPE_FROM_FAV', payload: id });
  };

  return (
    <GlobalContext.Provider
      value={{
        favList: state.favList,
        recipeLink: state.recipeLink,
        addRecipe,
        addLink,
        removeRecipe,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
