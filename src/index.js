import React from 'react';
import ReactDOM from 'react-dom/client';
import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import './index.css';
import App from './App';
import Recipe from './components/Recipe'
import AboutHomeMade from './components/AboutHomeMade'
import Details from './components/Details'
import BaseLayout from './components/layout/BaseLayout'
import coffeeReducer from './components/reducers/exampleSlice'
import DetailsForSearch from './components/DetailsForSearch';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, coffeeReducer)

const store = configureStore({
  reducer: {
    coffeeReducer: persistedReducer
  }
})

let persistor = persistStore(store)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <Router>
      <BaseLayout>
        <Routes>
          <Route path="/" element={ <App />} />
          <Route path="/recipe" element={ <Recipe />} />
          <Route path="/about" element={ <AboutHomeMade />} />
          <Route path='/details' element={ <Details /> } />
          <Route path='/searchDetails' element={ <DetailsForSearch /> } />
        </Routes>
      </BaseLayout>
    </Router>
  </React.StrictMode>
  </Provider>
);


