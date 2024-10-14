// // actions.js
// import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from './constant';

import { FETCH, SHOW, UPDATE ,REGISTER_USER,LOGIN_USER} from "./constant";
import  {UPDATE_SELECTED_TASK } from './constant'
import { ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE } from './constant';
// import { FETCH_TASKS_REQUEST, FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILURE } from './constant';
export const ADD_USER = 'ADD_USER'

export const fetchData =() =>{
     return{
          type:FETCH,
     }
}

export const showData = (data)=>{
  console.log("taskALLL===>",data);
  
   return{
     type :SHOW,
      payload : data
   }
}

export const updateData = (data)=>{
  console.log("@@",data);
  
     return{
       type :UPDATE,
        payload : data
     }
  }
  export const add_user = (user,callback)=>{
    console.log("??",user);
    return{
      type :ADD_USER,
       payload : user,
       callback,
    }
 }

  export const registerUser = (user) => ({
   type: REGISTER_USER,
   payload: user,
 });

 export const loginUser = (user,callback) =>{ 
  // console.log("loginn=====>",email,password);
  
   return{
   type: LOGIN_USER,
   payload: user,
   callback,
 }
};




//  user 
export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

// Action Creators
export const fetchUsersRequest = () => {
  console.log("fetchUsersRequest ===>");
  return {
    type: FETCH_USERS_REQUEST,
  }
};

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});



// Action Types
export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';
export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
export const CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE';


// Action Creators
export const fetchTasksRequest = () => {
console.log("dash====>");

  return{
    type: FETCH_TASKS_REQUEST,
  }
};

export const fetchTasksSuccess = (tasks) => ({
  type: FETCH_TASKS_SUCCESS,
  payload: tasks,
});

export const fetchTasksFailure = (error) => ({
  type: FETCH_TASKS_FAILURE,
  payload: error,
});

export const addTask = (task) => {
  console.log("addTask==>",task);
  
  return{
    type: ADD_TASK,
    payload: task,
  }

};
export const createTaskSuccess = (task) => ({
  type: CREATE_TASK_SUCCESS,
  payload: task,
});

export const createTaskFailure = (error) => ({
  type: CREATE_TASK_FAILURE,
  payload: error,
});


export const editTask = (task) => ({
  type: EDIT_TASK,
  payload: task,
});

export const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  payload: taskId,
});


export const UPDATE_TASK = "UPDATE_TASK";
export const  UPDATE_TASK_SUCCESS = "UPDATE_TASK_SUCCESS";
export const UPDATE_TASK_FAILURE = "UPDATE_TASK_FAILURE";
// export const UPDATE_SELECTED_TASK = "UPDATE_SELECTED_TASK";


export const updateTask = (id, updatedTaskData) => ({
  type: UPDATE_TASK,
  payload: { id, updatedTaskData },
});

export const updateTaskSuccess = (updatedTask) => ({
  type: UPDATE_TASK_SUCCESS,
  payload: updatedTask,
});

export const updateTaskFailure = (error) => ({
  type: UPDATE_TASK_FAILURE,
  payload: error,
});




export const updateSelectedTask = (taskId, updatedFields) => {
  console.log("=====>",updatedFields)
  return {
      type: UPDATE_SELECTED_TASK,
      payload: { taskId, updatedFields},
  };
};
// actionTypes.js
// actions.js

// Action to trigger saga for adding a comment
export const addCommentRequest = (taskId, comment) => {
  console.log("addCommentRequest==>",taskId, comment);
  

  return {
    type: ADD_COMMENT_REQUEST,
    payload: { taskId, comment},

  }
};

// Success action when the comment is successfully added
export const addCommentSuccess = (taskId, comment) => ({
  type: ADD_COMMENT_SUCCESS,
  payload: { taskId, comment},
});

// Failure action if adding a comment fails
export const addCommentFailure = error => ({
  type: ADD_COMMENT_FAILURE,
  payload: error,
});








