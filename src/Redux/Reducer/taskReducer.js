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
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  EDIT_COMMENT_REQUEST,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

} from '../Action/action';
import { UPDATE_SELECTED_TASK } from '../Action/constant';
import { ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE } from '../Action/constant';
const initialState = {
  tasks: [],
  error: null,
  isAuthenticated: true,
  users: [],
  comments: [],
};

const tasksReducer = (state = initialState, action) => {
  console.log("tasksReducer ==>",action.payload);
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
      return { ...state,
         error: action.payload 
        };
      
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
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        ),
      }
      
    case UPDATE_TASK_FAILURE:
      return {
        ...state,
        error: action.payload,
      };


    // case 'UPDATE_SELECTED_TASK':
    //   return {
    //     ...state,
    //     tasks: state.tasks.map(task =>
    //       task.id === action.payload.taskId ? { ...task, ...action.payload.updatedFields } : task
    //     ),
    //   };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.key !== action.payload),
      };


      case ADD_COMMENT_SUCCESS:
        console.log("ADD_COMMENT_SUCCESS===>",action.payload.co,...state.comments);
        
        return {
          ...state,
         comments: [...state.comments, ...action.payload.comments]
        };
      case ADD_COMMENT_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
        //  fetch all comments 

        
          case FETCH_COMMENTS_REQUEST:
            return {
              ...state,
            };
          case FETCH_COMMENTS_SUCCESS:
            return {
            
              ...state,
              comments: action.payload.comments,
            };
          case FETCH_COMMENTS_FAILURE:
            return {
              ...state,
              error: action.payload,
            };
            
            case DELETE_COMMENT_SUCCESS:
              console.log("comments=======>", state.comments);
              
              return {
                ...state,
                comments: state.comments.filter(comment => comment.id !== action.payload), 
              };
        
            case DELETE_COMMENT_FAILURE:
              return {
                ...state,
                error: action.payload,
              };

              case EDIT_COMMENT_REQUEST:
                return {
                  ...state,
                  // loading: true, // Set loading to true during the request
                };
          
              case EDIT_COMMENT_SUCCESS:
                // Update the specific comment based on the ID or some identifier
                console.log("EDIT_COMMENT_SUCCESS222===>",action.payload,state);
                return {
                  ...state,
                  comments: state.comments.map((comment) =>
                    comment.id === action.payload.comment.id
                      ? { ...comment, ...action.payload.comment } // Update the specific comment by ID
                      : comment
                  ),
                };
          
              case EDIT_COMMENT_FAILURE:
                return {
                  ...state,
                  // loading: false, // Stop loading
                  error: action.payload, // Set the error received from the failure action
                };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false, // Mark user as logged out
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        error: action.payload, // Store the error in the state
      };
          
    default:
      return state;
  }
};


export default tasksReducer;
