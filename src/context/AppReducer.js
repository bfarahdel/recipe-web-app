export default (state, action) => {
  switch (action.type) {
    case 'ADD_RECIPE_TO_FAV':
      return {
        ...state,
        favList: [action.payload, ...state.favList],
      };
    case 'REMOVE_RECIPE_FROM_FAV':
      return {
        ...state,
        favList: state.favList.filter((recipe) => recipe.id !== action.payload),
      };
    default:
      return state;
  }
};
