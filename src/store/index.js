import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'

import filter from '../components/heroesFilters/filterSlice';
import heroes from '../components/heroesList/heroesSlice';



const stringMiddleWeare = () => (next) => (action) =>{
    if(typeof action === 'string'){
        return next({
            type:action
        })
    }
    return next(action)
}

const store = configureStore({
    reducer:{heroes,filter},
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(stringMiddleWeare),
    devTools:process.env.NODE_ENV !=='production',

})
export default store; 