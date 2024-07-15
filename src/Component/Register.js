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
      message.error("Email already exists");

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
        <h2 className="reg">SignUp </h2>
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
                message: "Please input your name",
              },
            ]}
          >
            <Input
              name="name"
              placeholder="Enter  name"
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
                message: "Please input a valid email",
              },
            ]}
          >
            <Input name="email" value={user.email}  placeholder="Enter email" onChange={handleSUbmit} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password",
              },
            ]}
          >
            <Input.Password
              name="password"
              placeholder="Enter password"

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
                message: "Please input position",
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
              SignUp
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
