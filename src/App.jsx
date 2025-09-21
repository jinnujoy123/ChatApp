
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Home'
import Login from './pages/Login'

function App() {
 

  return (
    <>
     
  <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path="/chat" element={<Home />} />
  </Routes>

    </>
  )
}

export default App
