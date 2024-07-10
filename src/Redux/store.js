
import { configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import rootReducer from './Reducer/rootReducer';
import rootSaga from './saga/rootSaga';


const sagaMiddleware = createSagaMiddleware();



const store = configureStore({
     reducer:rootReducer,
     middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware().concat(sagaMiddleware),
});
console.log(rootReducer);
sagaMiddleware.run(rootSaga);
export default store;