// src/sagas/tasks.js


import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {FETCH_TASKS_REQUEST} from "../Action/constant"


import {fetchTasksSuccess,fetchTasksFailure} from '../Action/action';


function* fetchTasksSaga() {
      console.log("nitinNisha");
  try {
    const response = yield call(axios.get,"https://nitinsharma078.github.io/Default_Data/data.json");
    console.log("nitinNisha",response);
    // Adjust the path as needed
    yield put(fetchTasksSuccess(response.data.task));
  } catch (error) {
    yield put(fetchTasksFailure(error.message));
  }
}

function* tasksSaga() {
  yield takeEvery(FETCH_TASKS_REQUEST, fetchTasksSaga);

}

export default tasksSaga;
