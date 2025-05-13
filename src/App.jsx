
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router'
import Home from './pages/Home'
import About from './pages/About'
import AddStudentForm from './component/AddStudentForm'
import LoginForm from './component/LoginForm'
import LayoutStudent from './component/LayoutStudent'
import CourseDetails from './component/CourseDetails'
import EditUserDetails from './component/EditUserDetails'
function App() {
  
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/loginform" element={<LoginForm />} />
        <Route path="/addstudent" element={<AddStudentForm />} />
        <Route path="/layoutstudent" element={<LayoutStudent />}>
        <Route index path='courses' element={<CourseDetails />} />
        {/* <Route path="/courses" element={<CourseDetails/>} /> */}
        <Route path="results" element={<LoginForm/>} />
        <Route path="profile" element={<EditUserDetails/>} />
        </Route>
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
      </BrowserRouter>
    </>
    )
}

export default App
