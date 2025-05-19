import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import AddStudentForm from "./component/AddStudentForm";
import LoginForm from "./component/LoginForm";
import LayoutStudent from "./component/layout/LayoutStudent";
import CourseDetails from "./component/CourseDetails";
import EditUserDetails from "./component/EditUserDetails";
import UserResults from "./component/UserResult";
import StudentList from "./component/StudentList";
import LayoutTeacher from "./component/layout/LayoutTeacher";
import CourseList from "./component/CourseList";
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
            <Route index path="courses" element={<CourseDetails />} />
            {/* <Route path="/courses" element={<CourseDetails/>} /> */}
            <Route path="results" element={<UserResults />} />
            <Route path="editprofile" element={<EditUserDetails />} />
          </Route>

          <Route path="/layoutteacher" element={<LayoutTeacher />}>
            <Route index path="studentlist" element={<StudentList />} />
            <Route index path="courselist" element={<CourseList />} />
          </Route>
          <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
