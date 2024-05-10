// import logo from './logo.svg';
import './App.css';



import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login';
import StudentLogin from './components/StudentLogin';
import StudentSignup from './components/StudentSignup';
import TeacherSignup from './components/TeacherSignup';
import AdminSignup from './components/AdminSignup';
import AdminLoign from './components/AdminLoign';
import TeacherLogin from './components/TeacherLogin';

function App() {
  return (

<>
<BrowserRouter>



 
<Routes>
   <Route path='/login' element={<Login/>}/>
   <Route path='/studentlogin' element={<StudentLogin/>}/>
   <Route path='/studentsignup' element={<StudentSignup/>}/>
   <Route path='/teacherlogin' element={<TeacherLogin/>}/>
   <Route path='/teachersignup' element={<TeacherSignup/>}/>
   <Route path='/adminlogin' element={<AdminLoign/>}/>
   <Route path='/adminsignup' element={<AdminSignup/>}/>

 
</Routes>




</BrowserRouter>

</>


  );
}

export default App;
