import React, { useEffect, useState } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import {
  Button,
  Input,
  Upload,
  message,
  Image,
  Select,
  DatePicker,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { SiGoogletasks } from "react-icons/si";
import "./Task.css";
import { useDispatch, useSelector } from "react-redux";
import { addCommentRequest, fetchUsersRequest, updateSelectedTask, updateTask } from "../Redux/Action/action";

import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteSweep } from "react-icons/md";

import { MdDeleteForever } from "react-icons/md";
import { FcMediumPriority } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";
import { FaRegUserCircle } from "react-icons/fa";
import { MdTrackChanges } from "react-icons/md";
import { IoChevronBackCircle } from "react-icons/io5";

import dayjs from "dayjs";
const { TextArea } = Input;

const { Option } = Select;

const Task = ({ task, handleBackToList }) => {
  const dispatch = useDispatch();
  const [comments, setComments] = useState(task?.comments || [])
  // useEffect(()=>{
  //   dispatch( fetchUsersRequest());
  // },[dispatch])
                       
const users = useSelector((state) => state.tasksReducer.users);
  // console.log("nitinUsers===>",users);
  
  const data1 = useSelector((state) => state.tasksReducer.tasks);
  console.log("d",users, data1);
  const [comment, setComment] = useState("");
  const [fileList, setFileList] = useState([]);
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");
  const [editedCommentImages, setEditedCommentImages] = useState([]);
  const [editMode, setEditMode] = useState({
    task_title: false,
    description: false,
    assign_date: false,
    due_date: false,
    priority: false,
    status: false,
    assignedUser: false,
  });
  const userVal = JSON.parse(localStorage.getItem('user'));
  console.log("userVal===>",userVal,userVal.name);
  

  const [initialValues] = useState({
    task_title: task?.task_title || "",
    description: task?.description || "",
    assign_date: task?.assign_date || null,
    due_date: task?.due_date || null,
    priority: task?.priority || "",
    status: task?.status || "",
    assignedUser: task?.assignedUser || "",
  });

  const [editedValues, setEditedValues] = useState({ ...initialValues });
  const uniquePriorities = [...new Set(data1.map((option) => option.priority))];
  const uniqueStatus = [...new Set(data1.map((option) => option.status))];
  console.log("value =>>>", editedValues, initialValues);

  const handleEdit = (field) => {
    setEditMode({ ...editMode, [field]: true });
  };

  const handleSave = (field) => {
    setEditMode({ ...editMode, [field]: false });
  };

  const handleInputChange = (e, field) => {
    setEditedValues({ ...editedValues, [field]: e.target.value });
  };

  const handleSelectChange = (value, field) => {
    // dispatch(fetchUsersRequest()); 
    setEditedValues({ ...editedValues, [field]: value });
  };

  const handleEnterPress = (e, field) => {
    if (e.key === "Enter") {
      handleSave(field);
    }
  };


  const handleAddComment = () => {
    if (!comment.trim()) {
      message.error("Comment cannot be empty");
      return;
    }

    // Create a new comment object
    const newComment = {
      text: comment,
      images: fileList.map((file) => ({
        uid: file.uid,
        src: URL.createObjectURL(file.originFileObj),
        name: file.name,
        type: file.type,
        size: file.size,
      })), 
    };

    // Update comments state
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);

    // Prepare updated fields
    const updatedFields = {
      ...editedValues,
      comments: updatedComments,
    };

    // Dispatch the action to update the task in Redux
    // dispatch(updateSelectedTask(task.id, updatedFields));
    dispatch(addCommentRequest(task.id, updatedFields));


    // Clear the input fields
    setComment("");
    setFileList([]);
    message.success("Comment added successfully");
  };

  const handleEditComment = (index) => {
    setEditingCommentIndex(index);
    setEditedCommentText(comments[index].text);
    setEditedCommentImages(comments[index].images || []);
  };

  const handleSaveComment = (index) => {
    const updatedComments = comments.map((comment, i) =>
      i === index
        ? {
            ...comment,
            text: editedCommentText,
            images: editedCommentImages.map((file) => ({
              ...file,
              uid: file.uid,
              src: file.src || URL.createObjectURL(file.originFileObj),
              name: file.name,
              type: file.type,
              size: file.size,
            })),
          }
        : comment
    );
    setComments(updatedComments);
    dispatch(
      updateSelectedTask(task.id, {
        ...editedValues,
        comments: updatedComments,
      })
    );
    setEditingCommentIndex(null);
    setEditedCommentText("");
    setEditedCommentImages([]);
  };

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
    dispatch(
      updateSelectedTask(task.id, {
        ...editedValues,
        comments: updatedComments,
      })
    );
  };

  const handleDeleteImage = (commentIndex, imageIndex) => {
    const updatedComments = comments.map((comment, i) => {
      if (i === commentIndex) {
        const updatedImages = comment.images.filter((_, j) => j !== imageIndex);
        return {
          ...comment,
          images: updatedImages,
        };
      }
      return comment;
    });
    setComments(updatedComments);
    dispatch(
      updateSelectedTask(task.id, {
        ...editedValues,
        comments: updatedComments,
      })
    );
  };

  const handleCancelEditComment = () => {
    setEditingCommentIndex(null);
    setEditedCommentText("");
    setEditedCommentImages([]);
  };

  const handleUploadChange = ({ fileList }) => {
    if (fileList.length <= 2) {
      setFileList(fileList);
    } else {
      message.error("You can only upload up to 2 images.");
    }
  };

  const handleUploadCommentImagesChange = ({ fileList }) => {
    if (fileList.length <= 2) {
      setEditedCommentImages([...fileList]);
    } else {
      message.error("You can only upload up to 2 images.");
    }
  };
  console.log("option", uniquePriorities);

  const handleSubmit = () => {
    const updatedFields = {};
    Object.keys(editedValues).forEach((field) => {
      if (editedValues[field] !== initialValues[field]) {
        updatedFields[field] = editedValues[field];
      }
    });

    const serializedComments = comments.map((comment) => ({
      text: comment.text,
      images:
        comment.images &&
        comment.images.map((file) => ({
          uid: file.uid,
          src: file.src,
          name: file.name,
          type: file.type,
          size: file.size,
        })),
    }));

    if (comments !== task.comments) {
      updatedFields.comments = serializedComments;
    }
      dispatch(updateTask(task.id,updatedFields))
    // dispatch(updateSelectedTask(task.id, updatedFields));

    message.success("  save data success");
    handleBackToList();
  };

  if (!task) {
    return <p>No task selected</p>;
  }

  const assignedUserName =
    (users && users.find((user) => user.name === task.assignedUser)?.name) ||
    "Unknown User";

  return (
    <div className="task">
      <div className="task-1">
        <div className="content">
          <div className="task-heading">
            <div className="logo-heading">
              <SiGoogletasks />
            </div>
            <p className="p">!! Welcome to Task !!</p>
            <div className="task-3 btn">
              <div className="task-actions">
                <div className="logo-3">
                  <MdTrackChanges />
                </div>
                <Button onClick={handleSubmit} type="primary">
                  Save
                </Button>
              </div>

              <div className="task-actions">
                <div className="logo-3">
                  <IoChevronBackCircle />
                </div>

                <Button onClick={handleBackToList}>Back</Button>
              </div>
            </div>
          </div>

          <div className="task-3">
            <div className="task-details">
              <div className="status">
                <div className="logo-3">
                  <FcMediumPriority />
                </div>

                {/* Status */}
                {editMode.status ? (
                  <Select
                    value={editedValues.status}
                    style={{ width: "auto" }}
                    onChange={(value) => handleSelectChange(value, "status")}
                  >
                    {uniqueStatus.map((option) => (
                      <Select.Option key={option} value={option}>
                        {option}
                      </Select.Option>
                    ))}
                  </Select>
                ) : (
                  <p onClick={() => handleEdit("status")}>
                    {editedValues.status}
                  </p>
                )}
              </div>
              <div className="priority">
                {/* Priority */}
                <div className="logo-3">
                  <FcHighPriority />
                </div>
                {editMode.priority ? (
                  <Select
                    value={editedValues.priority}
                    style={{ width: "auto" }}
                    onChange={(value) => handleSelectChange(value, "priority")}
                  >
                    {uniquePriorities.map((priority, i) => (
                      <Select.Option key={i} value={priority}>
                        {priority}
                      </Select.Option>
                    ))}
                  </Select>
                ) : (
                  <p onClick={() => handleEdit("priority")}>
                    {" "}
                    {editedValues.priority}
                  </p>
                )}
              </div>

              <div className="assign">
                <div className="logo-3">
                  <FaRegUserCircle />
                </div>
                {/* Assigned User */}
                {editMode.assignedUser ? (
                  <Select
                    showSearch
                    value={editedValues.assignedUser}
                    style={{ width: "auto" }}
                    onChange={(value) =>
                      handleSelectChange(value, "assignedUser")
                    }
                  >
                    {users &&
                      users.map((user) => (
                        <Select.Option key={user.name} value={user.name}>
                          {user.name}
                        </Select.Option>
                      ))}
                  </Select>
                ) : (
                  <div onClick={() => handleEdit("assignedUser")}>
                    {assignedUserName}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Task Title */}
          <div className="task-info">
            <div className="input-value">
              {/* <label className="lable">Task Title</label> */}
              {editMode.task_title ? (
                <Input
                  className="t"
                  value={editedValues.task_title}
                  onChange={(e) => handleInputChange(e, "task_title")}
                  onKeyDown={(e) => handleEnterPress(e, "task_title")}
                  autoFocus
                />
              ) : (
                <p className="t" onClick={() => handleEdit("task_title")}>
                  {editedValues.task_title}
                </p>
              )}
            </div>
          </div>
          {/* Description */}
          <div className="task-info">
            {/* <div className="logo-2">
          <TbSubtask />
          </div> */}
            <div className="input-value">
              {/* <label className="lable">Description: </label> */}
              {editMode.description ? (
                <TextArea
                  className="dis"
                  value={editedValues.description}
                  onChange={(e) => handleInputChange(e, "description")}
                  onKeyDown={(e) => handleEnterPress(e, "description")}
                  autoFocus
                  rows={4}
                />
              ) : (
                <p className="dis" onClick={() => handleEdit("description")}>
                  {editedValues.description}
                </p>
              )}
            </div>
          </div>

          {/* <div className="Date-task"> */}
          <div className="task-info">
            {/* <div className="logo-2">
            <MdOutlineTipsAndUpdates />
            </div> */}
            <div className="input-value">
              <div className="date">
                {/* Assign Date */}
                 <div className="task-date-1">
                  <label>Start Date :</label>
                 <DatePicker
                    value={
                      editedValues.assign_date
                        ?dayjs(editedValues.assign_date)
                        : null
                    }
                    onChange={(date, dateString) =>
                      handleSelectChange(dateString, "assign_date")
                    }
                    onKeyDown={(e) => handleEnterPress(e, "assign_date")}
                    />
                 </div>


               <div className="task-date-2">
                <label>End Date :</label>
               <DatePicker
                    value={
                      editedValues.due_date
                        ?  dayjs(editedValues.due_date)
                        : null
                    }
                    onChange={(date, dateString) =>
                      handleSelectChange(dateString, "due_date")
                    }
                    onKeyDown={(e) => handleEnterPress(e, "due_date")}
                  />
               </div>


              </div>
            </div>
          </div>

          {/* </div> */}

          <div className="comments">
            <h3> Activity :</h3>
            <br></br>
            {comments.map((comment, index) => (
              <div key={index} className="comment-box">
                <div className="Comment-icon">
              <div className="commets-icon-1">
              <img src="./ic.png"  className="comments-logo"/>
                <span className="livePoint1"></span>
                </div>
                <p> {userVal.name}</p>
                </div>


                {editingCommentIndex === index ? (
                  <>
                    <div className="input-section">
                      <div className="textarea-container">
                        <TextArea
                          value={editedCommentText}
                          onChange={(e) => setEditedCommentText(e.target.value)}
                          rows={4}
                        />
                        <div className="button-group">
                          <Upload
                            fileList={editedCommentImages}
                            onChange={handleUploadCommentImagesChange}
                            beforeUpload={() => false}
                            multiple
                            className="task-upload"
                            showUploadList={{ showRemoveIcon: false }}
                          >
                            <Button icon={<UploadOutlined />}></Button>
                          </Upload>
                          <Button
                            type="primary"
                            onClick={() => handleSaveComment(index)}
                          >
                            Save
                          </Button>

                          <Button
                            className="task-cancel"
                            onClick={handleCancelEditComment}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p>{comment.text}</p>
                    <br></br>
                    <div>

                      {comment.images &&
                        comment.images.map((image, idx) => (

                          <div key={idx}>
                            <span>
                            <Image
                              src={image.src}
                              className=".comment-imag"
                              alt={`comment-image-${idx}`}

                            />
                            </span>

                            <MdDeleteForever
                              className="d"
                              onClick={() => handleDeleteImage(index, idx)}
                            />

                          </div>
                        ))}
                    </div>
                    <div className="edit-photo">
                      <CiEdit onClick={() => handleEditComment(index)} />
                      <MdOutlineDeleteSweep
                        onClick={() => handleDeleteComment(index)}
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="input-section">
            <div className="textarea-container-2">
              <TextArea
                className="input-1"
                placeholder=" Leave a Comments  ...."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
              <div className="button-group">
                <Upload
                  fileList={fileList}
                  onChange={handleUploadChange}
                  beforeUpload={() => false}
                  multiple
                  className="task-upload"
                  showUploadList={{ showRemoveIcon: false }}
                >
                  <Button icon={<UploadOutlined />} />
                </Upload>
                <Button onClick={handleAddComment} type="primary">
                  Add Comment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="task-2">
        <div className="task-details">
          <div className="status">
            <div className="logo-3">
              <FcMediumPriority />
            </div>

            {/* Status */}

            <Select
              value={editedValues.status}
              style={{ width: "120px" }}
              onChange={(value) => handleSelectChange(value, "status")}
            >
              {uniqueStatus.map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="priority">
            {/* Priority */}
            <div className="logo-3">
              <FcHighPriority />
            </div>
            <Select
              value={editedValues.priority}
              style={{ width: "120px" }}
              onChange={(value) => handleSelectChange(value, "priority")}
            >
              {uniquePriorities.map((priority, i) => (
                <Select.Option key={i} value={priority}>
                  {priority}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="assign">
            <div className="">

              <div className="commets-icon-1">
              <img src="./ic.png"  className="comments-logo"/>
                <span className="livePoint1"></span>
                </div>
            </div>
            {/* Assigned User */}
            <Select
              showSearch
              value={editedValues.assignedUser || undefined}
              className="asign-user"
              style={{ width: "120px" }}
              placeholder="Assignee"
              onChange={(value) => handleSelectChange(value, "assignedUser")}
            >
              {users  && users.map((user) => (
                <Option key={user.name} value={user.name}>
                  {user.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="but">
          <div className="task-actions  button-main-task ">
            <Button
              icon={<MdTrackChanges className="logo-3" />}
              onClick={handleSubmit}
              type="primary"
              className=" task-button"
            >
              Save changes
            </Button>
          </div>
          <div className="task-actions  button-main-task ">
            <Button
              icon={<IoChevronBackCircle className="logo-3" />}
              className="task-button-1"
              onClick={handleBackToList}
            >
              Back to task
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
