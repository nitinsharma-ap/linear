import { act } from "react";
import { ADD_USER } from "../Action/action";
import { SHOW, UPDATE } from "../Action/constant";
// const  initialState = [];
const initialState = {
     tasks: [],
   };

const subReducer = (state = initialState, action) => {
      console.log("state",state, action);
  switch (action.type) {
    case SHOW:
      return state;
    case UPDATE:
      return {
        ...state,
        tasks: action.payload.data,
      };
    case ADD_USER:
     return {
          ...state,
          tasks: [action.payload, ...state.tasks]};

    default:
      return state;
  }
};
export default subReducer;
