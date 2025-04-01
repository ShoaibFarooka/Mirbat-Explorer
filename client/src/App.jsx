import React from 'react'
import './index.css'
import Router from './router/Router.jsx';

const App = () => {
  return (
    <div className="App">
      <Router />
    </div>
    /*  <BrowserRouter>
       <Routes>
         <Route path='/' element={<Home />} />
         <Route path='/maps' element={<Maps />} />
         <Route path="*" element={<NotFound />} />
       </Routes>
     </BrowserRouter> */
  )
}

export default App
