import React, { useState } from 'react';
import { Modal, DatePicker, Input, Select, message } from 'antd';
import "./newTask.css";
import { GrTask } from "react-icons/gr";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { GrValidate } from "react-icons/gr";
import { TbArrowRoundaboutRight } from "react-icons/tb";
import { FcMediumPriority } from "react-icons/fc";
import { RiProgress2Fill } from "react-icons/ri";
import { ImUsers } from "react-icons/im";

const { Option } = Select;

function NewTask({ isModalOpen, handleOk, handleCancel, users }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignDate, setAssignDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [status, setStatus] = useState('Status');
  const [priority, setPriority] = useState('Priority');
  const [assignedUser, setAssignedUser] = useState('Assign User');

  const onSubmit = () => {
    if (!taskTitle || !description || !assignDate || !dueDate || status === 'Status' || priority === 'Priority' || !assignedUser) {
      message.error('Please fill in all fields.');
      return;
    }

    const formattedAssignDate = assignDate ? assignDate.format('YYYY-MM-DD') : null;
    const formattedDueDate = dueDate ? dueDate.format('YYYY-MM-DD') : null;

    const task = {
      key: Date.now(),
      task_title: taskTitle,
      description,
      assign_date: formattedAssignDate,
      due_date: formattedDueDate,
      status,
      priority,
      assignedUser
    };

    handleOk(task);
  message.success("You have succuss full add task.")
    setTaskTitle('');
    setDescription('');
    setAssignDate('');
    setDueDate('');
    setStatus('Status');
    setPriority('Priority');
    setAssignedUser('Assign User');
  };

  return (
    <Modal
      title={" !! Create New  Issuse !! "}
      open={isModalOpen}
      onOk={onSubmit}
      onCancel={handleCancel}
      className='modal-new-task'
    >
      <div className='modal-date'>
        <GrTask className='icon' />
        <Input
          className='tasktitle'
          placeholder='New Task'
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
      </div>
      <div className='modal-date'>
        <TbArrowRoundaboutRight className='icon'/>
        <Input.TextArea
          className='modal-description'
          placeholder='Add Comments !!!..'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className='modal-date'>
        <div className='date-12'>
          <MdOutlineTipsAndUpdates className='icon'/>
          <DatePicker
            className='assign_date'
            style={{ marginBottom: "5px", width: "auto" }}
            value={assignDate}
            onChange={(date) => setAssignDate(date)}
          />
        </div>
        <div className='date-12'>
          <GrValidate className='icon'/>
          <DatePicker
            className='due_date'
            style={{ marginBottom: "5px", width: "auto" }}
            value={dueDate}
            onChange={(date) => setDueDate(date)}
          />
        </div>
      </div>
      <div className='modal-status'>
        <div className='icon-center'>
        <RiProgress2Fill className='icon'/>
          <Select
            className='status'
            defaultValue="Status"
            value={status}
            onChange={(value) => setStatus(value)}
          >
            <Option value="Status">Status</Option>
            <Option value="Todo">Todo</Option>
            <Option value="Done">Done</Option>
            <Option value="InProgress">In Progress</Option>
            <Option value="InDevReview">In Dev Review</Option>
          </Select>
        </div>
        <div className='icon-center'>
          <FcMediumPriority className='icon'/>
          <Select
            className='priority'
            defaultValue="Priority"
            value={priority}
            onChange={(value) => setPriority(value)}
          >
            <Option value="Priority">Priority</Option>
            <Option value="Urgent">Urgent</Option>
            <Option value="WithinOneDay">Within One Day</Option>
            <Option value="AfterReview">After Review</Option>
          </Select>
        </div>
        <div className='modal-admin icon-center'>
        <ImUsers className='icon'/>
          <Select
            className='assign-user'
            placeholder="Select a user"
            value={assignedUser}
            onChange={(value) => setAssignedUser(value)}
          >
            { users && users.map(user => (
              <Option key={user.id} value={user.name}>{user.name}</Option>
            ))}
          </Select>
        </div>
      </div>
    </Modal>
  );
}

export default NewTask;
