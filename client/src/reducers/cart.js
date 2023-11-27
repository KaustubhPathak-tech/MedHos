const cartReducer = (state = { data:null }, action) => {
  switch (action.type) {
    case "USER_CART":
      return { ...state, data: action?.payload };
    default:
      return state;
  }
};

export default cartReducer;
