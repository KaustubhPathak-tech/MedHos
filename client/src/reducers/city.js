const cityReducer = (state = { data: null }, action) => {
    switch (action.type) {
      
     
      case "GET_CITY":
        return { ...state, data:action?.payload};
      default:
        return state;
    }
  };
  
  export default cityReducer;