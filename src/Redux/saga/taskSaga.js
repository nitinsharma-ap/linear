
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {ADD_COMMENT_REQUEST, FETCH_TASKS_REQUEST, SHOW} from "../Action/constant"
import { message } from 'antd';

import {fetchTasksSuccess,fetchTasksFailure, ADD_TASK, createTaskSuccess, createTaskFailure, FETCH_USERS_REQUEST, fetchUsersSuccess, fetchUsersFailure, updateSelectedTask, updateTaskSuccess, addCommentSuccess, addCommentFailure, fetchCommentsRequest, FETCH_COMMENTS_REQUEST, fetchCommentsSuccess, DELETE_TASK_REQUEST, DELETE_COMMENT_REQUEST, deleteCommentSuccess, deleteCommentFailure, EDIT_COMMENT_REQUEST} from '../Action/action';

import {UPDATE_TASK,UPDATE_TASK_FAILURE } from "../Action/action"

//
function* createTasksSaga(action) {
  try {
    const token = localStorage.getItem('access_token');
    // const user = JSON.parse(localStorage.getItem('user'));
    
    const assigned_user_id = action.payload && action.payload.UserID;
    const project_id = 1; // Adjust as needed

    console.log("assigned_user_id=>",assigned_user_id,action);
    
    
    const payloadWithUserAndProject = {
      task: { ...action.payload },
      assigned_user_id,
      project_id
    };
    
    // API call to create task
    const response = yield call(axios.post, 'https://mysite-q830.onrender.com/api/v1/tasks', payloadWithUserAndProject, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log("loggcre==>",response,response.data.task,typeof(response.data));
      
    
    yield put(createTaskSuccess(
      response.data.task)); 

    // Show success message
    message.success('Task successfully');
  } catch (error) {
    console.log("errror====>",error);
    
    // On error, handle it and show an error message
    yield put(createTaskFailure(error.message));
    message.error('Failed');
  }
}
function*showAllTask(){
  console.log("nitinNisha");
    try {
      const token = localStorage.getItem('access_token');
      const response = yield call(axios.get,"https://mysite-q830.onrender.com/api/v1/tasks",
        {headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
    });
      console.log("nitinNisha===>",response.data.tasks);
      // Adjust the path as needed
      yield put(fetchTasksSuccess(response.data.tasks));
    } catch (error) {
      yield put(fetchTasksFailure(error.message));
    }
  }
function* allUsers(){
    console.log("==========>");
    try {
      const token = localStorage.getItem('access_token');
      console.log('token=======>',token);
      const response = yield call(axios.get,"https://mysite-q830.onrender.com/api/v1/users",
        {headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
    });
      console.log("usersALl===>",response.data);
      // Adjust the path as needed
      yield put(fetchUsersSuccess(response.data));
    } catch (error) {
      yield put(fetchUsersFailure(error.message));
    }

  }
  function* updateTask(action) {
    // console.log("update====>",action);
    
    
    
    try {
      const token = localStorage.getItem('access_token');
      const { id, updatedTaskData ,assigned_user_id} = action.payload;
      console.log("updatedTaskData==>",action.payload,updatedTaskData);
      
      const project_id = 1;
      const payloadWithUpdateProject = {
        task: {...updatedTaskData},
        assigned_user_id,
        project_id
      };
  
      // API request to update the task
      const response = yield call(axios.put, `https://mysite-q830.onrender.com/api/v1/tasks/${id}`, payloadWithUpdateProject , {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log("Update======>",response.data);
      
  
      yield put(updateTaskSuccess(response.data.task));

      // Trigger frontend update with the response from the backend
      // yield put(updateSelectedTask(id, response.data));
      message.success('Task updated successfully');
    } catch (error) {
      if (error.response?.status === 404) {
        message.error('Task not found');
      } 
  
      // Dispatch failure action in case of an error
      yield put(UPDATE_TASK_FAILURE(error.message));
    }
  }


  function* getAllComments(action) {
    console.log("addCommentSaga===>",action.payload);
    
    try {
      const { taskId} = action.payload;
    // console.log("taskId====>",comment.comments);
    
      const token = localStorage.getItem('access_token');
      
      const response = yield call(axios.get, `https://mysite-q830.onrender.com/api/v1/task/${taskId}/comments`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log("response====>",response);
      
      // Dispatch success action with response data
      yield put(fetchCommentsSuccess(response.data));
      
    } catch (error) {
      // Dispatch failure action with error message
      yield put(addCommentFailure(error.message));
    }
  }
  function* addCommentSaga(action) {
    console.log("addCommentSaga===>", action.payload);
    
    try {
      const { taskId, comment } = action.payload;
      console.log("taskId====>", taskId, "Comment====>", comment);
      
      const token = localStorage.getItem('access_token'); 
    const payload = {
      comments: comment.comments.map((commentItem) => ({
          text: commentItem.text,
          image: commentItem.images || []
      })),
  };
   console.log("payload===>",payload);
   
     
        const response = yield call(axios.post, `https://mysite-q830.onrender.com/api/v1/tasks/${taskId}/comments`,payload,{
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
                'Authorization': `Bearer ${token}`, // Include token for authorization
            },
        });
  
        console.log("response======>",response.data);
        message.success('add success')
        
        // Dispatch success action with response data
      yield put(addCommentSuccess( response.data));
  
    } catch (error) {
      message.error('error')
        // Dispatch failure action with error message
        // yield put(addCommentFailure(error.message));
    }
}
function* deleteCommmentsSaga(action) {
  
  try {
    const token = localStorage.getItem('access_token'); // Get auth token if needed
    const commentId = action.payload;
    console.log("Delete===>",action.payload,commentId);

    // API call to delete the task
    const response = yield call(axios.delete, `https://mysite-q830.onrender.com/api/v1/comments/${commentId}`, {
      headers: {
         'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }); 

    console.log("response....",response)

    // Dispatch success action if API call is successful
    yield put(deleteCommentSuccess(commentId ));
    message.success('Task deleted successfully'); // Show success message

  } catch (error) {
    // Dispatch failure action if something goes wrong
    yield put(deleteCommentFailure(error.message));
    message.error('Failed to delete task');
  }
}
function* editCommmentsSaga(action) {
  console.log("action==>",action.payload);
  try {
    const token = localStorage.getItem('access_token'); // Get auth token if needed
    const commentId = action.payload.id;
    const comments = [action.payload];
   const comment = {comments}
   const payload = {
    comments: comment.comments.map((commentItem) => ({
        text: commentItem.text,
        image: commentItem.images || []
    })),
};
    
    console.log("DeleteText===>",payload);


    // API call to delete the task
    const response = yield call(axios.put, `https://mysite-q830.onrender.com/api/v1/comments/${commentId}`,payload, {
      headers: {
         'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }); 

    console.log("response111===>",response)

    // Dispatch success action if API call is successful
    // yield put(deleteCommentSuccess(commentId ));
    message.success('Task deleted successfully'); // Show success message

  } catch (error) {
   
    console.log("error=====>",error);
    
    message.error('Failed to delete task');
  }
}
  
function* tasksSaga() {
  // yield takeEvery(FETCH_TASKS_REQUEST, fetchTasksSaga);
  yield takeEvery(ADD_TASK, createTasksSaga);
  yield takeEvery(SHOW, showAllTask);
  yield takeEvery(FETCH_USERS_REQUEST,allUsers);
  yield takeEvery(UPDATE_TASK,updateTask);
  yield takeEvery(ADD_COMMENT_REQUEST, addCommentSaga);
  yield takeEvery(FETCH_COMMENTS_REQUEST, getAllComments);
  yield takeEvery(DELETE_COMMENT_REQUEST, deleteCommmentsSaga);
  yield takeEvery(EDIT_COMMENT_REQUEST, editCommmentsSaga);
}

export default tasksSaga;

