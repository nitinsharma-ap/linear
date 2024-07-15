import { combineReducers } from '@reduxjs/toolkit';
import subReducer from './subReducer';

import themeReducer from './theamSlice';
import tasksReducer from './taskReducer';


const rootReducer = combineReducers({
     subReducer,
    themeReducer,
    tasksReducer,

}

);
export default rootReducer;