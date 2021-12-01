import { createContext, useReducer } from 'react';
// import { responsivePropType } from 'react-bootstrap/esm/createUtilityClasses';
import AppReducer from './AppReducer';

const initialState = {
  favList: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
  // global state for the user's favorite list
  const [state, dispatch] = useReducer(AppReducer, initialState);
  console.log('fav list STATEE', state.favList);

  // const handleAdd = () => {
  //   fetch('/add_recipe', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       content: state.favList,
  //     }),
  //   });
  // };

  // Function that gets called when user presses 'Add to Fav' button
  const addRecipe = (recipe, username) => {
    fetch('/add_recipe/add_db_favList', {
      method: 'POST',
      body: JSON.stringify({
        id: recipe.id,
        username,
        json_field: recipe,

      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json()).then((message) => console.log(message));

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
