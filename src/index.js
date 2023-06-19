import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Recipe from './components/Recipe'
import AboutHomeMade from './components/AboutHomeMade'
import BaseLayout from './components/layout/BaseLayout'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
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
);


