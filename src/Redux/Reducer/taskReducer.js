import {
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILURE,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,

} from '../Action/action';
import { UPDATE_SELECTED_TASK } from '../Action/constant';
import { ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE } from '../Action/constant';
const initialState = {
  tasks: [],
  error: null,
  users: []
};

const tasksReducer = (state = initialState, action) => {
  console.log("tasksReducer ==>",action.payload, state);
  switch (action.type) {
    // Add the new task to the tasks array

    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
        error: null,
      };
    case FETCH_TASKS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    // case ADD_TASK:
    //   return {
    //     ...state,
    //     tasks: [ action.payload , ...state.tasks],
    //   };
    case ADD_TASK:
      return { ...state };

    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks]
      };

    case CREATE_TASK_FAILURE:

      return { ...state, error: action.payload };
      
    case EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.key === action.payload.key ? action.payload : task
        ),
      };
    case FETCH_USERS_REQUEST:
      return {
        ...state
      }
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload
      }
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        error: action.payload,
      }


    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        // tasks: state.tasks.map((task) =>
        //   task.id === action.payload.id ? action.payload : task
        // ), // Update the task in the state
        tasks: [action.payload, ...state.tasks]
      };

    case UPDATE_TASK_FAILURE:
      return {
        ...state,
        error: action.payload,
      };


    case 'UPDATE_SELECTED_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId ? { ...task, ...action.payload.updatedFields } : task
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.key !== action.payload),
      };


      case ADD_COMMENT_SUCCESS:
        return {
          ...state,
          tasks: state.tasks.map(task =>
            task.id === action.payload.taskId
              ? {
                  ...task,
                  comments: [...task.comments, { 
                    comment: action.payload.comment, 
                    image: action.payload.image 
                  }],
                }
              : task
          ),
        };
      case ADD_COMMENT_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
    default:
      return state;
  }
};


export default tasksReducer;
