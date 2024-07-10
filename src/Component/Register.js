import { useNavigate } from "react-router-dom";
import "./Register.css";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useState } from "react";
import { registerUser, loginUser, updateData, add_user } from "../Redux/Action/action";
import { useSelector, useDispatch } from "react-redux";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const users = useSelector((state) => state.subReducer.tasks);
  console.log("register",users);

  // console.log("nisha", data);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    position: "",
  });
  let name, value;
  const handleSUbmit = (e) => {
    name = e.target.name;
    console.log("N",name);
    value = e.target.value;
    setUser({ ...user, [name]: value });
    console.log(e.target.name);
  };

  function handleCancle() {
    navigate("/");
  }
  function handleSub() {

    const emailExists = users && users.some((u) => u.email === user.email);
    console.log("++",emailExists);
    if (emailExists) {
      setError("Email already exists");
      return;
    }
    if (!user.name || !user.email || !user.password || !user.position) {
      message.error("All fields are required");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

if (!emailRegex.test(user.email)) {
  message.error("Invalid email address");
  return;
} {
      dispatch(add_user(user));
      navigate("/");
    }

  }

  return (
    <div className="main-register">
      <div className="register-form">
        <h2>Register now !</h2>
        <Form
          name="basic"
          className="form-register"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              name="name"
              placeholder="Enter First Name"
              className="Resiger-input"
              values={user.name}
              onChange={handleSUbmit}
            />
          </Form.Item>
          <Form.Item
            label="Email Id"
            name="email"

            rules={[
              {
                required: true,
                type: "email",
                message: "Please input a valid email!",
              },
            ]}
          >
            <Input name="email" value={user.email}  placeholder="Enter Email" onChange={handleSUbmit} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              name="password"
              placeholder="Enter Password"

              value={user.password}
              onChange={handleSUbmit}
            />
          </Form.Item>

          <Form.Item
            label="Position"
            name="position"
            rules={[
              {
                required: true,
                message: "Please enter position!",
              },
            ]}
          >
            <Input
              name="position"
              placeholder="Enter positon"
              className="Resiger-input"
              values={user.position}
              onChange={handleSUbmit}
            />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          {error && <p className="error">{error}</p>}
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              onClick={() => handleSub()}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
            <Button
              onClick={() => handleCancle()}
              type="primary"
              htmlType="submit"
              className="backtoLOGIN"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Register;
// import { useNavigate } from "react-router-dom";
// import "./Register.css";
// import { Button, Form, Input } from "antd";
// import { useState } from "react";
// import { registerUser } from "../Redux/Action/action";
// import { useSelector, useDispatch } from "react-redux";

// const Register = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const users = useSelector((state) => state.Register.users);
//   const user_data =  useSelector((state)=>state.DataReducer);

//   console.log("==>1",user_data );
//   const [user, setUser] = useState({
//     FirstName: "",
//     LastName: "",
//     Email: "",
//     Password: "",
//     ConfirmPassword: "",
//   });
//   const [error, setError] = useState("");
//   console.log("==>",user);

//   const handleSubmit = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };

//   const handleCancel = () => {
//     navigate("/");
//   };

//   const handleRegister = () => {
//     const emailExists = users.some((u) => u.Email === user.Email);
//     // const nameExists = users.some((u) => u.FirstName === user.FirstName && u.LastName === user.LastName);

//     if (emailExists) {
//       setError("Email already exists");
//       return;
//     }else {
//       dispatch(registerUser(user));
//     navigate("/");
//     }

//     if (user.Password !== user.ConfirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }


//   };

//   return (
//     <div className="main-register">
//       <div className="register-form">
//         <h2>Register now!</h2>
//         {error && <p className="error">{error}</p>}
//         <Form
//           name="basic"
//           className="form-register"
//           labelCol={{ span: 8 }}
//           wrapperCol={{ span: 16 }}
//           style={{ maxWidth: 600 }}
//           initialValues={{ remember: true }}
//           onFinish={handleRegister}
//           autoComplete="off"
//         >
//           <Form.Item
//             label="First Name"
//             name="FirstName"
//             rules={[{ required: true, message: "Please input your first name!" }]}
//           >
//             <Input
//               name="FirstName"
//               placeholder="Enter First Name"
//               className="Register-input"
//               value={user.FirstName}
//               onChange={handleSubmit}
//             />
//           </Form.Item>
//           <Form.Item
//             label="Last Name"
//             name="LastName"
//             rules={[{ required: true, message: "Please input your last name!" }]}
//           >
//             <Input
//               name="LastName"
//               className="Register-input"
//               placeholder="Enter Last Name"
//               value={user.LastName}
//               onChange={handleSubmit}
//             />
//           </Form.Item>
//           <Form.Item
//             label="Email"
//             name="Email"
//             rules={[
//               { required: true, type: "email", message: "Please input a valid email!" }
//             ]}
//           >
//             <Input
//               name="Email"
//               placeholder="Enter Email"
//               className="Register-input"
//               value={user.Email}
//               onChange={handleSubmit}
//             />
//           </Form.Item>
//           <Form.Item
//             label="Password"
//             name="Password"
//             rules={[{ required: true, message: "Please input your password!" }]}
//           >
//             <Input.Password
//               name="Password"
//               placeholder="Enter Password"
//               value={user.Password}
//               onChange={handleSubmit}
//             />
//           </Form.Item>
//           <Form.Item
//             label="Confirm Password"
//             name="ConfirmPassword"
//             rules={[{ required: true, message: "Please confirm your password!" }]}
//           >
//             <Input.Password
//               name="ConfirmPassword"
//               placeholder="Confirm Password"
//               value={user.ConfirmPassword}
//               onChange={handleSubmit}
//             />
//           </Form.Item>
//           <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//             <Button onClick={handleRegister} type="primary" htmlType="submit">
//               Register
//             </Button>
//             {" "}
//             <Button onClick={handleCancel} type="default">
//               Cancel
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default Register;

