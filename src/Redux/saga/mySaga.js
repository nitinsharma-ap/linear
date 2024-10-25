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
import { LOGOUT_REQUEST, logoutSuccess } from "../Action/action";
 // Assuming you are using Ant Design for notifications

function* fetchData(action) {
  try {
    const user = action.payload; // Assuming the user object is passed in action.payload
    const response = yield call(axios.post, "http://localhost:3000/api/v1/users", {
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
    const response = yield call(axios.post, "http://localhost:3000/api/v1/login", {
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
function* logOut(action) {
  try {
    const token = localStorage.getItem('access_token'); // Ensure token is correctly stored
    // API call to log out
    console.log("token1212355452==>",token);
    
    const response = yield call(axios.post, `http://localhost:3000/api/v1/logout`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer${token}`,
      },
    });
   
    // Dispatch success action if API call is successful
    yield put(logoutSuccess(response));
    
    // Clear token from localStorage
    if(response.ok){
      console.log("response=====22>",response.message);
      
      // localStorage.removeItem('access_token');
    }
    if (action.callback) {
      action.callback();
    }

    // Navigate to login page or home page
    

    message.success('Logged out successfully'); // Show success message

  } catch (error) {
    console.error("Logout error=====>", error);
    
    message.error('Failed to log out');
  }
}



// Watcher saga for ADD_USER and LOGIN_USER actions
function* mySaga() {
  yield takeEvery(ADD_USER, fetchData);
  yield takeEvery(LOGIN_USER, fetchLoginData);
  yield takeEvery(LOGOUT_REQUEST,logOut);

}

export default mySaga;

