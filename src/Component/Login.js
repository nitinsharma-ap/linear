// import React, { useEffect, useState } from "react";
// import { Button, Form, Input } from "antd";
// import { showData } from "../Redux/Action/action";
// import "./Login.css";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";


// const Login = () => {
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state.subReducer.state);
//   console.log("****2",data);
//   const navigate = useNavigate();

//   const [userId, setUserId] = useState("");
//   const [password, setPassword] = useState("");
//   const [UserIdError, setUserIdError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const valid = useSelector((state) => state.Register.users);
//   console.log(valid);

//   useEffect(() => {
//     dispatch(showData());
//   }, [dispatch]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let isValid = true;

//     if (userId === '') {
//       setUserIdError("Enter the UserId");
//       isValid = false;
//     } else {
//       setUserIdError("");
//     }

//     if (password === '') {
//       setPasswordError("Password cannot be blank");
//       isValid = false;
//     } else {
//       setPasswordError("");
//     }

//     if (!isValid) {
//       return;
//     }

//     await Promise.resolve();

//     let UserFound = false;
//     let loggedInUser = null;

//     data.forEach(item => {

//       if (item.email === userId && item.password === password) {
//         UserFound = true;
//         loggedInUser = item;
//       }
//     });

//     valid.forEach(item => {
//         console.log("===>",item);
//       if (item.Email === userId && item.Password === password) {
//         UserFound = true;
//         loggedInUser = item;
//       }
//     });

//     if (UserFound) {
//       setUserIdError("");
//       setPasswordError("");
//       localStorage.setItem("token",Math.random());
//       localStorage.setItem("user", JSON.stringify(loggedInUser));
//       navigate("/dashboard", { state: { user: loggedInUser } });
//     } else {
//       setUserIdError("Invalid userId !");
//       setPasswordError("Invalid password !");
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       navigate("/dashboard");
//     }
//   }, [navigate]);

//   const handleRegister = () => {
//     navigate("/register");
//   };

//   return (
//     <div className="main">
//       <div className="loginP">
//         <div className="login">
//           <h1>Login</h1>
//           <Form onSubmitCapture={handleSubmit}>
//             <div className="user">
//               <label className="label">User Id</label>
//               <Input
//                 type="text"
//                 className="input"
//                 placeholder="Enter User ID"
//                 value={userId}
//                 onChange={(e) => setUserId(e.target.value)}
//               />
//               {UserIdError && <p className="error">{UserIdError}</p>}
//               <br />
//               <label className="label">Password</label>
//               <Input
//                 type="password"
//                 className="input"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               {passwordError && <p className="error">{passwordError}</p>}
//               <br />
//               <br />
//             </div>
//             <div className="button-login">
//             <Button type="primary" htmlType="submit">
//               Submit
//             </Button>
//             <Button onClick={handleRegister} className="Register">
//               Register
//             </Button>
//             </div>

//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { showData } from "../Redux/Action/action";
import "./Login.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.subReducer.tasks);
  const data1 = useSelector((state) => state)
  console.log("da",data1);
  console.log("us",data);
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [UserIdError, setUserIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // const valid = useSelector((state) => state.Register.users);
  // console.log(valid);

  useEffect(() => {
    if(!data.length){
      dispatch(showData());
    }

  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (userId === '') {
      setUserIdError("Enter the UserId");
      isValid = false;
    } else {
      setUserIdError("");
    }

    if (password === '') {
      setPasswordError("Password cannot be blank");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) {
      return;
    }

    await Promise.resolve();

    let UserFound = false;
    let loggedInUser = null;

    data.forEach(item => {

      if (item.email === userId && item.password === password) {
        UserFound = true;
        loggedInUser = item;
      }
    });



    if (UserFound) {
      setUserIdError("");
      setPasswordError("");
      localStorage.setItem("token",Math.random());
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      navigate("/dashboard", { state: { user: loggedInUser } });
    } else {
      setUserIdError("Invalid userId !");
      setPasswordError("Invalid password !");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="main">
      <div className="loginP">
        <div className="login">
          <h1>Login</h1>
          <Form onSubmitCapture={handleSubmit}>
            <div className="user">
              <label className="label">User Id</label>
              <Input
                type="text"
                className="input"
                placeholder="Enter User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              {UserIdError && <p className="error">{UserIdError}</p>}
              <br />
              <label className="label">Password</label>
              <Input
                type="password"
                className="input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p className="error">{passwordError}</p>}
              <br />
              <br />
            </div>
            <div className="button-login">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button onClick={handleRegister} className="Register">
              Register
            </Button>
            </div>

          </Form>
        </div>
      </div>
    </div>
  );
};
export default Login;