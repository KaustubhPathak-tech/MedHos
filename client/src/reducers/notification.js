const notiReducer = (state = { data:null }, action) => {
    switch (action.type) {
      case "NOTI":
        return { ...state, data: action?.payload };
      case "SNOTI":
        return { ...state, data: action?.payload };
      default:
        return state;
    }
  };
  
  export default notiReducer;
  