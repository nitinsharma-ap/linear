/*  Right side*/
import React, { useState} from "react";
import { Button, List, Avatar, } from "antd";
import { StepBackwardOutlined, StepForwardOutlined } from "@ant-design/icons";
import "./rightSide.css";
import Task from "./Task";
import { GrTask } from "react-icons/gr";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { TbArrowRoundaboutRight } from "react-icons/tb";
import { GrValidate } from "react-icons/gr";
import { GrStatusGoodSmall } from "react-icons/gr";
import { FcMediumPriority } from "react-icons/fc";
import { FaRegUser } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FaUserCircle } from "react-icons/fa";
import Support from "./Support";
import UserTable from "./User";
import { useDispatch } from "react-redux";
import { fetchCommentsRequest } from "../Redux/Action/action";

const RightSide = ({tasks,filter,searchQuery,viewMode, users,hideHeader,showHeader,
selectedTask,setSelectedTask,
}) => {
  console.log("vivek===>",users ,tasks);
  const [currentPage, setCurrentPage] = useState(1);
 const dispatch = useDispatch();

  const itemsPerPage = viewMode === "grid" ? 3 : 15;
  console.log("task", tasks);

  const filteredTasks = tasks && tasks.filter((task) => {
    const query = searchQuery ?.toLowerCase();
    console.log("v1", query);
    const matchesSearchQuery =
      task.task_title?.toLowerCase().includes(query) ||
      task.priority ?.toLowerCase().includes(query) ||
      task.status ?.toLowerCase().includes(query) ||
      task.assign_date ?.toLowerCase().includes(query) ||
      task.due_date ?.toLowerCase().includes(query);

    if (!searchQuery) {
      if (filter === "home") return true;
      if (filter === "my_issues") return task.status !== "Done";
      if (filter === "completed") return task.status === "Done";
      return true;
    }

    if (filter === "home") return matchesSearchQuery;
    if (filter === "my_issues")
      return task.status !== "Done" && matchesSearchQuery;
    if (filter === "completed")
      return task.status === "Done" && matchesSearchQuery;
    return matchesSearchQuery;
  }) || [];

  const handleTaskCardClick = (task) => {
    // console.log("fetchCommentsRequest==>",task);
    
    setSelectedTask(task);
    dispatch(fetchCommentsRequest(task.id))
    hideHeader();
  };

  const handleBackToList = () => {
    setSelectedTask(null);
    showHeader();
  };
  console.log("--n", filter);
  const renderTasksByStatus = (status) => {
    const tasksByStatus = filteredTasks.filter(
      (task) => task.status ?.toLowerCase() === status.toLowerCase()
    );
    console.log("renderTasksByStatus", tasksByStatus, filteredTasks);
    const startIndex = (currentPage - 1) * itemsPerPage;
    console.log("1",startIndex);
    const endIndex = startIndex + itemsPerPage;
    const paginatedTasks = tasksByStatus.slice(startIndex, endIndex);
    console.log("pagi",paginatedTasks);


    return paginatedTasks.map((task, index) => {
      console.log("task====>",task.assigned_user_id);
      
      
      const user = users && users.find((user) => 
        
        user.id === task.assigned_user_id);
        // console.log("user====>",user);
      
      return (

        <div
          key={index}
          className="task-card"
          onClick={() => handleTaskCardClick(task)}
        >
          <div className="admin-right">
          <p className="header-task p-1">
            <GrTask className="icon-list" />  {task.task_title.slice(0,25)}
          </p>
          <div className="commets-icon-1">

              <div   className="comments-logo-1"> {user ?user.name.slice(0,1) :  <img src="./ic.png"  className="comments-logo"/>} </div>
                <span className="livePoint1"></span>
                </div>

          </div>
          <p className="discrip p-2">
            <TbArrowRoundaboutRight className="icon-list"  />  {task.description.slice(0, 25) + "..."}
          </p>

          <div className="date-2 p3">
            <p>
            <SlCalender  className="icon-list" />  {task.assign_date}
            </p>
            <p>
              <GrValidate className="icon-list"  />  {task.due_date}
            </p>
          </div>
          <div className="Horigental p-4">
            <p>
              <GrStatusGoodSmall className="icon-list"  />  {task.status}
            </p>
            <p>
              <FcMediumPriority className="icon-list"  /> {task.priority}
            </p>


          </div>
          <p className="p-5">
            <FaRegUser className="icon-list"  />  {user ? user.name : "Assign"}
          </p>
        </div>
      );
    });
  };

  const renderTaskList = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex);
    console.log("pagi",paginatedTasks);

    return (
      <List
        itemLayout="horizontal"
        className="Listview"
        dataSource={paginatedTasks}
        renderItem={(item, index) => {

      const user = users && users.find((user) => user.id === item.assigned_user_id);
      console.log("user===>",user);
      
          return (
            <List.Item onClick={() => handleTaskCardClick(item)}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    className="avtar"
                    src={`https://api.dicebear.com/7.x/icons/svg?seed=${index}&style=task`}
                  />
                }
                title={<div className="list-task"> {item.task_title}</div>}
                description={
                  <div className="list-task">
                    <div className="list-task-1">
                      <TbArrowRoundaboutRight className="icon-list"  />{" "}
                      {item.description.slice(0, 25) + "..."}
                    </div>
                    <div>
                    <SlCalender className="icon-list" /> {item.assign_date}
                    </div>

                    <div>
                      <GrStatusGoodSmall className="icon-list"  /> {item.status}
                    </div>
                    <div>
                      <FcMediumPriority className="icon-list"  /> {item.priority}
                    </div>

                    <div>
                      <GrValidate className="icon-list" /> {item.due_date}
                    </div>
                    <div>
                      <FaUserCircle className="icon-list" /> {user ? user.name : " User"}
                    </div>
                  </div>
                }
              />
            </List.Item>
          );
        }}
      />
    );
  };

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < filteredTasks.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  };
  console.log(filteredTasks.length, currentPage,itemsPerPage, "hame");

const len1 = renderTasksByStatus("Todo").length;
const len2 = renderTasksByStatus("InProgress").length;
const len3 = renderTasksByStatus("Done").length;
const len4 = renderTasksByStatus("InDevReview").length;


const countTasksByStatus = (status) => {
  return filteredTasks.filter(
    (task) => task.status?.toLowerCase() === status.toLowerCase()
  ).length;
};



  return (
    <div className={`right-side ${viewMode === "list" ? "list-view" : ""}`}>
      {filter === "support" ? (
        <div className="support">
          <Support />
        </div>
      ) : filter === "users" ? (
        <UserTable users={users} />
      ) : (
        <>
          {!selectedTask ? (
            viewMode === "grid" ? (
              <div className="tasks-grid">
                {filter === "completed" ? (
                  ""
                ) : (
                  <div className="column">
                    <div className="point">
                      <div className="todo"></div>
                      <h3>Todo ({countTasksByStatus("Todo")})</h3>
                    </div>
                    <div className="col-1">{renderTasksByStatus("Todo") }</div>
                  </div>
                )}
                {filter === "completed" ? (
                  ""
                ) : (
                  <div className="column">
                    <div className="point">
                      <div className="pro"></div>
                      <h3>In-progress ({countTasksByStatus("InProgress")})</h3>
                    </div>
                    {renderTasksByStatus("InProgress")}
                  </div>
                )}
                {filter === "my_issues" ? (
                  ""
                ) : (
                  <div className="column">
                    <div className="point">
                      <div className="done"></div>
                      <h3>Done ({countTasksByStatus("Done")})</h3>
                    </div>
                    {renderTasksByStatus("Done")}
                  </div>
                )}
                {filter === "completed" ? (
                  ""
                ) : (
                  <div className="column">
                    <div className="point">
                      <div className="in"></div>
                      <h3>In-dev review ({countTasksByStatus("InDevReview")})</h3>
                    </div>
                    {renderTasksByStatus("InDevReview")}
                  </div>
                )}
              </div>
            ) : (
              <div className="tasks-list">{renderTaskList()}</div>
            )
          ) : (
            <div className="task-details">
              <Task
                task={selectedTask}
                users={users}
                handleBackToList={handleBackToList}

              />
            </div>
          )}
          {!selectedTask ? (
            <div className="pagination-controls">
              <div className="pagination-btn-1">
                <Button
                  type="primary"
                  icon={<StepBackwardOutlined />}
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                />
              </div>
              <div className="pagination-btn-1">
                <Button
                  type="primary"
                  icon={<StepForwardOutlined />}
                  onClick={handleNextPage}
                  disabled ={viewMode === "list" ? (filteredTasks.length<= currentPage * itemsPerPage) : (len1 <=1 && len2 <=1 && len3 <=1 && len4 <=1 )}

                />
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
};

export default RightSide;
