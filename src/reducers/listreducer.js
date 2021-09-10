const initialState = {
  breeds: [],
  filterbreeds: [],
  breedImages: [],
  favImage: [],
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
    case "LIKE_IMAGE":
      return {
        ...state,
        favImage: [...state.favImage, action.payload],
      };
    case "UNLIKE_IMAGE":
      return {
        ...state,
        favImage: state.favImage.filter((item) => item !== action.payload),
      };
    default:
      return state;
  }
};
export default breadsReducer;
