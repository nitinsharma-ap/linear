
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {ADD_COMMENT_REQUEST, FETCH_TASKS_REQUEST, SHOW} from "../Action/constant"
import { message } from 'antd';

import {fetchTasksSuccess,fetchTasksFailure, ADD_TASK, createTaskSuccess, createTaskFailure, FETCH_USERS_REQUEST, fetchUsersSuccess, fetchUsersFailure, updateSelectedTask, updateTaskSuccess, addCommentSuccess, addCommentFailure} from '../Action/action';

import {UPDATE_TASK,UPDATE_TASK_FAILURE } from "../Action/action"

//
function* createTasksSaga(action) {
  try {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
  // console.log("logg==>",token,user.user["id"]);
  
    const user_id = user.user['id'];
    const project_id = 1; // Adjust as needed

    const payloadWithUserAndProject = {
      task: { ...action.payload },
      user_id,
      project_id
    };

    // API call to create task
    const response = yield call(axios.post, 'http://localhost:3000/tasks', payloadWithUserAndProject, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    // On successful task creation, update the frontend state
    yield put(createTaskSuccess(response.data)); // This will update Redux state

    // Show success message
    message.success('Task created successfully');
  } catch (error) {
    // On error, handle it and show an error message
    yield put(createTaskFailure(error.message));
    message.error('Failed to create task');
  }
}
function*showAllTask(){
  console.log("nitinNisha");
    try {
      const token = localStorage.getItem('access_token');
      const response = yield call(axios.get,"http://localhost:3000/tasks",
        {headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
    });
      console.log("nitinNisha===>",response.data);
      // Adjust the path as needed
      yield put(fetchTasksSuccess(response.data));
    } catch (error) {
      yield put(fetchTasksFailure(error.message));
    }
  }
function* allUsers(){
    console.log("==========>");
    try {
      const token = localStorage.getItem('access_token');
      console.log('token=======>',token);
      const response = yield call(axios.get,"http://localhost:3000/api/v1/users",
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
    
    const { id, updatedTaskData } = action.payload;
  
    try {
      const token = localStorage.getItem('token');
  
      // API request to update the task
      const response = yield call(axios.put, `http://localhost:3000/tasks/${id}`, updatedTaskData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      yield put(updateTaskSuccess(response.data));

      // Trigger frontend update with the response from the backend
      yield put(updateSelectedTask(id, response.data));
      message.success('Task updated successfully');
    } catch (error) {
      if (error.response?.status === 404) {
        message.error('Task not found');
      } 
  
      // Dispatch failure action in case of an error
      yield put(UPDATE_TASK_FAILURE(error.message));
    }
  }


  // function* addCommentSaga(action) {
  //   console.log("addCommentSaga===>",action.payload);
    
  //   try {
  //     const { taskId, comment} = action.payload;
  //   console.log("taskId====>",comment.comments);
    
  //     const token = localStorage.getItem('token');
      
  //     // Prepare the data for the request
  //     const formData = new FormData();
  //     // formData.append('comment[text]', commentText);
  //     // formData.append('comment[image]', imageFile);
      
  //     // if (image) {
  //     //   formData.append('image', image);  // Append the image if available
  //     // }
      
  //     // Make the POST request to add a comment with an image
  //     const response = yield call(axios.post, `http://localhost:3000/tasks/${taskId}/comments`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         'Authorization': `Bearer ${token}`,
  //       },
  //     });
      
  //     // Dispatch success action with response data
  //     yield put(addCommentSuccess(taskId, response.data.comment, response.data.image));
      
  //   } catch (error) {
  //     // Dispatch failure action with error message
  //     yield put(addCommentFailure(error.message));
  //   }
  // }
  function* addCommentSaga(action) {
    console.log("addCommentSaga===>", action.payload);
  
    try {
        const { taskId, comment } = action.payload;
        console.log("taskId====>", taskId, "Comment====>", comment);
  
        const token = localStorage.getItem('token');
  
        // Prepare the data for the request
        const payload = {
            comments: comment.comments.map((commentItem) => ({
                text: commentItem.text,
                images: commentItem.images || [] // Include images if they exist
            })),
        };

        console.log("Payload===>", payload, comment.comments.text);
      
        // Make the POST request to add a comment with an image
        const response = yield call(axios.post, `http://localhost:3000/tasks/${taskId}/comments`, comment.comments.text, {
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
                'Authorization': `Bearer ${token}`, // Include token for authorization
            },
        });
  
        console.log("response",response);
        
        // Dispatch success action with response data
        yield put(addCommentSuccess(taskId, response.data.comment, response.data.image));
  
    } catch (error) {
        // Dispatch failure action with error message
        yield put(addCommentFailure(error.message));
    }
}
  
function* tasksSaga() {
  // yield takeEvery(FETCH_TASKS_REQUEST, fetchTasksSaga);
  yield takeEvery(ADD_TASK, createTasksSaga);
  yield takeEvery(SHOW, showAllTask);
  yield takeEvery(FETCH_USERS_REQUEST,allUsers);
  yield takeEvery(UPDATE_TASK,updateTask);
  yield takeEvery(ADD_COMMENT_REQUEST, addCommentSaga);

}

export default tasksSaga;

