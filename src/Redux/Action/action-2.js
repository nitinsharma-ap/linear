actions.js
export const UPDATE_TASKS = 'UPDATE_TASKS';
export const GET_TASK = 'GET_TASK';

export const updateTasks = (taskData) => ({

    type: UPDATE_TASKS,
    payload: taskData
});

export const getTask = () => ({
    type: GET_TASK
});
