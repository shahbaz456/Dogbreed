const initialState = {
  breeds: [],
  filterbreeds: [],
  breedImages: [],
};

const breadsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LIST_BREEDS":
      return { ...state, breeds: action.payload, filterbreeds: action.payload };
    case "GET_BREED_IMAGES":
      return { ...state, breedImages: action.payload };
    case "FILTER_BREEDS":
      return {
        ...state,
        filterbreeds: state.breeds.filter((item) =>
          item.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    default:
      return state;
  }
};
export default breadsReducer;
