import React, { useState } from "react";
import {
  UsergroupAddOutlined,
  CheckCircleOutlined,
  HomeOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { Menu, Switch } from "antd";
import useDarkMode from "../Dark/useDarkMode";
import "./leftSide.css";
import { MdSupportAgent } from "react-icons/md";
import { CgDarkMode } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { fetchUsersRequest } from "../Redux/Action/action";
// import { fetchUsersRequest } from ".//";

function LeftSideBar({
  userVal,
  onFilterChange,
  isMenuVisible2,
  onFilterChangeCallback,
  showHeader,
}) {
  const [theme, toggleTheme] = useDarkMode("");
  const [current, setCurrent] = useState("home");
  console.log("uers11",userVal);
  const dispatch = useDispatch();
  // const id  = localStorage.getItem('user')
  
  

  const items = [
    {
      key: "home",
      label: "Home",
      icon: <HomeOutlined />,
    },
    {
      key: "my_issues",
      label: "My Issues",
      icon: <ExportOutlined />,
    },
    {
      key: "completed",
      label: "Completed",
      icon: <CheckCircleOutlined />,
    },
    {
      key: "users",
      label: "Users",
      icon: <UsergroupAddOutlined />,
    },
    {
      key: "support",
      label: "Support",
      icon: <MdSupportAgent />,
    },
  ];

  const onClick = (e) => {
    setCurrent(e.key);
    
    if (e.key === "users") {
      console.log("E.k",e.key);

      dispatch( fetchUsersRequest()); 
    }
    if (onFilterChange) {
      onFilterChange(e.key);
    }
    if (onFilterChangeCallback) {
      onFilterChangeCallback();
      showHeader();
    }
  };

  return (
    <div className={`Main ${theme}-theme`}>
      {isMenuVisible2 && (
        <div className="dropdown-2">
          <div className="list">
            <div className="userSection">
              <div className="userPhoto">
                <div className="icon">
                  {/* {userVal.photo ? (
                    <img src={userVal.photo} alt="User Avatar" className="userAvatar" />
                  ) : (
                    <img src="./ic.png" alt="Default Avatar" className="userAvatar" />
                  )} */}
                  <span className="livePoint"></span>
                </div>
                <div className="username">
                  {(
                    userVal || `${userVal.FirstName} ${userVal.LastName}`
                  ).toUpperCase()}
                </div>
              </div>
              <div className="dark-mode">
                <div className="Dark">
                  <div>
                    <CgDarkMode className="d1" />
                  </div>
                  <div>
                    <p>Dark Mode </p>
                  </div>
                </div>
                <div className="s">
                  <Switch
                    size="small"
                    checked={theme === "dark"}
                    className="switch"
                    onChange={toggleTheme}
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                  />
                </div>
              </div>
              <br />
              <Menu
                className="dark"
                theme={theme === "dark" ? "dark" : "light"}
                onClick={onClick}
                selectedKeys={[current]}
                mode="inline"
                items={items}
              />
            </div>
          </div>
        </div>
      )}
      <div className="list">
        <div className="userSection">
          <div className="userPhoto">
            <div className="icon">
              {userVal.photo ? (
                <img src={userVal.photo} alt="User Avatar" className="userAvatar" />
              ) : (
                <img src="./ic.png" alt="Default Avatar" className="userAvatar" />
              )}
              <span className="livePoint"></span>
            </div>
            <div className="username">
              {(
                userVal || `${userVal.FirstName} ${userVal.LastName}`
              ).toUpperCase()}
            </div>
          </div>
          <Menu
            className="darkc"
            theme={theme === "dark" ? "dark" : "light"}
            onClick={onClick}
            selectedKeys={[current]}
            mode="inline"
            items={items}
          />
          <div className="dark-mode">
            <div className="Dark">
              <div>
                <CgDarkMode />
              </div>
              <div>
                <p>Dark Mode </p>
              </div>
            </div>
            <div>
              <Switch
                checked={theme === "dark"}
                className="switch"
                onChange={toggleTheme}
                checkedChildren="Dark"
                unCheckedChildren="Light"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSideBar;
