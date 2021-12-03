export default (state, action) => {
  switch (action.type) {
    case 'ADD_RECIPE_TO_FAV':
      return {
        ...state,
        favList: [action.payload, ...state.favList],
      };
    case 'ADD_LINK':
      return {
        ...state,
        recipeLink: [action.payload, ...state.recipeLink],
      };

    case 'REMOVE_RECIPE_FROM_FAV':
      return {
        ...state,
        favList: state.favList.filter((recipe) => recipe !== action.payload),
      };
    default:
      return state;
  }
};
