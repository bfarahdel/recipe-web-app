import { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  favList: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
  // global state for the user's favorite list
  const [state, dispatch] = useReducer(AppReducer, initialState);
  console.log('fav list STATEE', state.favList);

  // Function that gets called when user presses 'Add to Fav' button
  const addRecipe = (recipe) => {
    dispatch({ type: 'ADD_RECIPE_TO_FAV', payload: recipe });
  };

  return (
    <GlobalContext.Provider
      value={{ favList: state.favList, addRecipe }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
