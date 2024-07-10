
import { FETCH, SHOW, UPDATE ,REGISTER_USER,LOGIN_USER} from "./constant";
import  {UPDATE_SELECTED_TASK } from './constant'
// import { FETCH_TASKS_REQUEST, FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILURE } from './constant';
export const ADD_USER = 'ADD_USER'

export const fetchData =() =>{
     return{
          type:FETCH,
     }
}

export const showData = (data)=>{
   return{
     type :SHOW,
      payload : data
   }
}

export const updateData = (data)=>{
     return{
       type :UPDATE,
        payload : data
     }
  }
  export const add_user = (user)=>{
    console.log("??",user);
    return{
      type :ADD_USER,
       payload : user
    }
 }

  export const registerUser = (user) => ({
   type: REGISTER_USER,
   payload: user,
 });

 export const loginUser = (email, password) => ({
   type: LOGIN_USER,
   payload: { email, password },
 });

// Action Types
export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';
export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const DELETE_TASK = 'DELETE_TASK';


// Action Creators
export const fetchTasksRequest = () => ({
  type: FETCH_TASKS_REQUEST,
});

export const fetchTasksSuccess = (tasks) => ({
  type: FETCH_TASKS_SUCCESS,
  payload: tasks,
});

export const fetchTasksFailure = (error) => ({
  type: FETCH_TASKS_FAILURE,
  payload: error,
});

export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

export const editTask = (task) => ({
  type: EDIT_TASK,
  payload: task,
});

export const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  payload: taskId,
});




export const updateSelectedTask = (taskId, updatedFields) => {
  return {
      type: 'UPDATE_SELECTED_TASK',
      payload: { taskId, updatedFields},
  };
};






