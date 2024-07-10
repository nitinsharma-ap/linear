import { REGISTER_USER , LOGIN_USER } from "../Action/constant";
const initialState = {
    users: [],
    isAuthenticated: false,
    currentUser: null,
  };

const Register = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_USER:
       console.log("nit",action.payload);
        return {
          ...state,
          users: [...state.users, action.payload],
        };
      case LOGIN_USER:
        const user = state.users.find(
          (user) => user.Email === action.payload.email && user.Password === action.payload.password
        );
        if (user) {
          return {
            ...state,
            isAuthenticated: true,
            currentUser: user,
          };
        } else {
          return state;
        }
      default:
        return state;
    }
  };
  export default Register;