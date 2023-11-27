const aptuserReducer = (state = { data:null }, action) => {
    switch (action.type) {
        case "GET_USER_APPOINTS":
            return { ...state, data: action?.payload };
      default:
        return state;
    }
  };
  
  export default aptuserReducer;
  