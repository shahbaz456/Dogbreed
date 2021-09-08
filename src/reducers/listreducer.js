const initialState = {
  breads: [],
  breadImages: [],
};

const breadsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LIST_BREADS":
      return { ...state, breads: action.payload };
    case "GET_BREAD_IMAGES":
      return { ...state, breadImages: action.payload };
    default:
      return state;
  }
};
export default breadsReducer;
