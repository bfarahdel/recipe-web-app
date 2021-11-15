import { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  favList: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  console.log('fav list STATEE', state.favList);
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
