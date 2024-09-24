// import { useNavigate } from "react-router-dom";
// import "./Register.css";
// import { Button, Form, Input, message } from "antd";
// import { useState } from "react";
// import {add_user } from "../Redux/Action/action";
// import { useSelector, useDispatch } from "react-redux";
// const onFinish = (values) => {
//   console.log("Success:", values);
// };
// const onFinishFailed = (errorInfo) => {
//   console.log("Failed:", errorInfo);
// };

// function Register() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();


//   const users = useSelector((state) => state.subReducer.tasks);
//   console.log("register",users);

//   // console.log("nisha", data);
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     password: "",
//     position: "",
//   });
//   let name, value;
//   const handleSUbmit = (e) => {
//     name = e.target.name;
//     console.log("N",name);
//     value = e.target.value;
//     setUser({ ...user, [name]: value });
//     console.log(e.target.name);
//   };

//   function handleCancle() {
//     navigate("/");
//   }
//   function handleSub() {

//     const emailExists = users && users.some((u) => u.email === user.email);
//     console.log("++",emailExists);
//     if (emailExists) {
//       message.error("Email already exists");

//       return;
//     }
//     if (!user.name || !user.email || !user.password || !user.position) {
//       message.error("All fields are required");
//       return;
//     }
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// if (!emailRegex.test(user.email)) {
//   message.error("Invalid email address");
//   return;
// } {
//       dispatch(add_user(user));
//       navigate("/");
//     }

//   }

//   return (
//     <div className="main-register">
//       <div className="register-form">
//         <h2 className="reg">Sign up </h2>
//         <Form
//           name="basic"
//           className="form-register"
//           labelCol={{
//             span: 8,
//           }}
//           wrapperCol={{
//             span: 16,
//           }}
//           style={{
//             maxWidth: 600,
//           }}
//           initialValues={{
//             remember: true,
//           }}
//           onFinish={onFinish}
//           onFinishFailed={onFinishFailed}
//           autoComplete="off"
//         >
//           <Form.Item
//             label="Name"
//             name="name"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your name",
//               },
//             ]}
//           >
//             <Input
//               name="name"
//               placeholder="Enter  name"
//               className="Resiger-input"
//               values={user.name}
//               onChange={handleSUbmit}
//             />
//           </Form.Item>
//           <Form.Item
//             label="Email Id"
//             name="email"

//             rules={[
//               {
//                 required: true,
//                 type: "email",
//                 message: "Please input a valid email",
//               },
//             ]}
//           >
//             <Input name="email" value={user.email}  placeholder="Enter email" onChange={handleSUbmit} />
//           </Form.Item>
//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your password",
//               },
//             ]}
//           >
//             <Input.Password
//               name="password"
//               placeholder="Enter password"

//               value={user.password}
//               onChange={handleSUbmit}
//             />
//           </Form.Item>

//           <Form.Item
//             label="Position"
//             name="position"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input position",
//               },
//             ]}
//           >
//             <Input
//               name="position"
//               placeholder="Enter positon"
//               className="Resiger-input"
//               values={user.position}
//               onChange={handleSUbmit}
//             />
//           </Form.Item>

//           <Form.Item
//           className="singup-page"
//           >
//             <Button
//               onClick={() => handleSub()}
//               type="primary"
//               htmlType="submit"
//             >
//               Sign up
//             </Button>
//             <Button
//               onClick={() => handleCancle()}
//               type="primary"
//               htmlType="submit"
//               className="backtoLOGIN"
//             >
//               Back to login
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// }

// export default Register;
// //
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { add_user } from "../Redux/Action/action";
import { useSelector, useDispatch } from "react-redux";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const users = useSelector((state) => state.subReducer.tasks);
  // console.log("raq",users);
  

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    position: "",
  });

  // Update user state as form fields change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle form submission
  const handleSubmit = () => {
  const res  = dispatch(add_user(user, () => {
      // Navigate after success
      navigate('/');
    }));
 console.log("nicq",res);
 
    // const emailExists = users && users.some((u) => u.email === user.email);

    // if (emailExists) {
    //   message.error("Email already exists");
    //   return;
    // }

    // Check for empty fields
    if (!user.name || !user.email || !user.password || !user.position) {
      message.error("All fields are required");
      return;
    } 

    // Email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(user.email)) {
      message.error("Invalid email address");
      return;
    }
   
  };

  return (
    <div className="main-register">
      <div className="register-form">
        <h2 className="reg">Sign up</h2>
        <Form
          name="register"
          className="form-register"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name" }]}
          >
            <Input
              name="name"
              placeholder="Enter name"
              value={user.name}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, type: "email", message: "Please input a valid email" },
            ]}
          >
            <Input
              name="email"
              placeholder="Enter email"
              value={user.email}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password" }]}
          >
            <Input.Password
              name="password"
              placeholder="Enter password"
              value={user.password}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item
            label="Position"
            name="position"
            rules={[{ required: true, message: "Please input your position" }]}
          >
            <Input
              name="position"
              placeholder="Enter position"
              value={user.position}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item className="signup-page">
            <Button type="primary" htmlType="submit">
              Sign up
            </Button>
            <Button
              type="default"
              onClick={() => navigate("/")}
              className="backtoLOGIN"
            >
              Back to login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Register;
