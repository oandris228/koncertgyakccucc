import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NavBar } from './comp/NavBar'
import { Home } from './comp/Home'
import { Add } from './comp/Add'
import { useState } from 'react';

function App() {

  const [activeSection, setActiveSection] = useState('list');

  return (
    <>
      <div className="container">
      <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<Add />} />
            </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
