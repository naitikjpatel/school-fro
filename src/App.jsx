import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";

import LoginForm from "./component/LoginForm";
import LayoutStudent from "./component/layout/LayoutStudent";
import CourseDetails from "./component/CourseDetails";
import EditUserDetails from "./component/EditUserDetails";
import UserResults from "./component/UserResult";
import StudentList from "./component/StudentList";
import LayoutTeacher from "./component/layout/LayoutTeacher";
import CourseList from "./component/CourseList";
import AddStudentFormModal from "./component/AddStudentFormModal";
import CourseListS from "./component/CourseListWithSubject";
import UserExamResultModal from "./component/UserExamResultModal";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/loginform" element={<LoginForm />} />
          <Route path="/addstudent" element={<AddStudentFormModal />} />
          <Route path="/layoutstudent" element={<LayoutStudent />}>
            <Route index element={<CourseDetails/>}/>
            <Route path="courses" element={<CourseDetails />} />
            <Route path="results" element={<UserResults />} />
            <Route path="editprofile" element={<EditUserDetails />} />
          </Route>

          {/* This is For the Teacher Dashboard */}
          <Route path="editresult/:userId" element={<UserExamResultModal />} />
          <Route path="/layoutteacher" element={<LayoutTeacher />}>
            <Route index  element={<StudentList />} />
            <Route  path="studentlist" element={<StudentList />} />
            <Route path="courselist" element={<CourseList />} />

            {/* This route showing courseList according with it's subject */}
            <Route path="subjects" element={<CourseListS />} />
          </Route>
          <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
