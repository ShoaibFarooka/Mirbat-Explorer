import React from 'react'
import './index.css'
import Router from './router/Router.jsx';
import Login from './pages/admin/Login/Login.jsx';
import Dashboard from './pages/admin/Dashboard/Dashboard.jsx';

const App = () => {
  return (
    <div className="App">
      <Router />
    </div>
  )
}

export default App
