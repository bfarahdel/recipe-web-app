export default (state, action) => {
  switch (action.type) {
    case 'ADD_RECIPE_TO_FAV':
      return {
        ...state,
        favList: [action.payload, ...state.favList],
      };
    default:
      return state;
  }
};
