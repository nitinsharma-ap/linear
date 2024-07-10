import React from "react";

import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";
import { FETCH, SHOW, UPDATE } from "../Action/constant";
// import { showData } from "../action";
// import { useEffect } from "react";
console.log("nitin");

function* fetchData() {
      let response = yield call(axios.get, "https://nitinsharma078.github.io/Sign/data.json");
       let data =  yield response.data;
      console.log(data);
      yield put({type:UPDATE, payload :data});
   }


function* mySaga() {
  yield takeEvery(SHOW, fetchData);

}

export default mySaga;
