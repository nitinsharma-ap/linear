import { combineReducers } from '@reduxjs/toolkit';
import subReducer from './subReducer';

import themeReducer from './theamSlice';
import tasksReducer from './taskReducer';
// import userReducer from './userReducer';


const rootReducer = combineReducers({
     subReducer,
    themeReducer,
    // userReducer,
    tasksReducer,

}

);
export default rootReducer;