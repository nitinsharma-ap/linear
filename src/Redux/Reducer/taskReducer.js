import {
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
} from '../Action/action';
import {UPDATE_SELECTED_TASK} from '../Action/constant';
const initialState = {
  tasks: [],
  error: null,
};

const tasksReducer = (state = initialState, action) => {
  // console.log("==>",action.payload.updatedFields );
  switch (action.type) {
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
    case ADD_TASK:
      return {
        ...state,
        tasks: [ action.payload , ...state.tasks],
      };
    case EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.key === action.payload.key ? action.payload : task
        ),
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
    default:
      return state;
  }
};

export default tasksReducer;
