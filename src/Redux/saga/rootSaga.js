import { all } from 'redux-saga/effects';
import taskSaga from './taskSaga';
import mySaga from './mySaga';


function* rootSaga() {
  yield all([
     mySaga(),
    taskSaga(),
    

  ]);
  console.log("NITIN");
}
rootSaga()
export default rootSaga;