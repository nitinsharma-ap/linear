// import React from "react";

// import axios from "axios";
// import { takeEvery, call, put } from "redux-saga/effects";
// import { FETCH, SHOW, UPDATE } from "../Action/constant";
// // import { showData } from "../action";
// // import { useEffect } from "react";
// console.log("nitin");

// function* fetchData() {
//       let response = yield call(axios.get, "https://nitinsharma078.github.io/Sign/data.json");
//        let data =  yield response.data;
//       console.log(data);
//       yield put({type:UPDATE, payload :data});
//    }


// function* mySaga() {
//   yield takeEvery(SHOW, fetchData);

//  yield takeEvery(SHOW, fetchData);
// }

// export default mySaga;
import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";
import { ADD_USER, LOGIN_USER, UPDATE } from "../Action/constant";
import { message } from "antd";
 // Assuming you are using Ant Design for notifications

function* fetchData(action) {
  try {
    const user = action.payload; // Assuming the user object is passed in action.payload
    const response = yield call(axios.post, "https://mysite-q830.onrender.com/api/v1/users", {
      user: {
        name: user.name,
        email: user.email,
        password: user.password,
        position: user.position,
      },
    });

    const data = response.data; // Extracting data from the response
    console.log("nitinSharam--->", data);

    message.success("User registered successfully!");

    // Call the callback to navigate after success
    if (action.callback) {
      action.callback();
    }
  } catch (error) {
    message.error("Email already exists");
    console.error("Registration error:", error);
  }
}


function* fetchLoginData(action) {
  console.log("nitin@",action);
  

  const { email, password } = action.payload;


  try {
    const response = yield call(axios.post, "https://mysite-q830.onrender.com/api/v1/login", {
      email,
      password,
    });
    console.log("nitinS",response);

    const {access_token, user } = response.data;
    console.log("nitinToken",user,access_token);
    

    // Save token and user data to localStorage
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("user", JSON.stringify(user)); 

    
    if (response.status === 200) {
      yield put({ type: 'LOGIN_SUCCESS', payload: response.data });

      // Call the callback function if provided
      if (action.callback) {
        action.callback();
      }

      message.success("Login successful!");
    } else {
      message.error("Login failed");
    }
  } catch (error) {
    message.error("An error occurred during login.");
    console.error("Login error:", error);
  }
}
// Watcher saga for ADD_USER and LOGIN_USER actions
function* mySaga() {
  yield takeEvery(ADD_USER, fetchData);
  yield takeEvery(LOGIN_USER, fetchLoginData);
}

export default mySaga;

