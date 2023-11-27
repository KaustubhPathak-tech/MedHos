const orderReducer = (state = { data:null }, action) => {
    switch (action.type) {
      case "GET_ORDER":
        return { ...state, data: action?.payload };
      default:
        return state;
    }
  };
  
  export default orderReducer;
  