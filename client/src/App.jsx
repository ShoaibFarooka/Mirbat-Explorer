import React from 'react'
import './index.css'
import Home from './pages/Home/Home'
import Maps from './pages/Maps/Maps'
import NotFound from './pages/NotFound/NotFound'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/maps' element={<Maps />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
