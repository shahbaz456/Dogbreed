const initialState = {
  breeds: [],
  breedImages: [],
};

const breadsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LIST_BREEDS":
      return { ...state, breeds: action.payload };
    case "GET_BREED_IMAGES":
      return { ...state, breedImages: action.payload };
    default:
      return state;
  }
};
export default breadsReducer;
