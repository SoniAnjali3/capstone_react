import rootReducer from './../src/capstone/reducers';
//import configureStore from './../src/capstone/stores/configureStore';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

export const findByTestAtrr = (component, attr) => {
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
};

export const testStore = (initialState) => {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
      );
};