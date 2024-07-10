import { combineReducers } from '@reduxjs/toolkit';
import subReducer from './subReducer';
import Register from './Rgister';
import themeReducer from './theamSlice';
import tasksReducer from './taskReducer';
import DataReducer from './DataReducer';

const rootReducer = combineReducers({
     subReducer,
     Register,
    themeReducer,
    tasksReducer,
    DataReducer
}

);
export default rootReducer;