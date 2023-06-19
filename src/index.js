import React from 'react';
import ReactDOM from 'react-dom/client';
import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'

import './index.css';
import App from './App';
import Recipe from './components/Recipe'
import AboutHomeMade from './components/AboutHomeMade'
import BaseLayout from './components/layout/BaseLayout'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const store = configureStore({
  reducer: {

  }
})


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
        </Routes>
      </BaseLayout>
    </Router>
  </React.StrictMode>
  </Provider>
);


