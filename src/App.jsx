
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router'
import Home from './pages/Home'
import About from './pages/About'
import AddStudentForm from './component/AddStudentForm'
import LoginForm from './component/LoginForm'
function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/"element={<Home/>} />
          <Route path="/about" element={<About />} />
          <Route path="/loginform" element={<LoginForm/>} />
          <Route path="/addstudent" element={<AddStudentForm/>} />
          <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
