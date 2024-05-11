
import React from 'react'
import { useNavigate } from 'react-router-dom';

import styles from './Styles/login.module.css'

const Login = () => {

    const navigate = useNavigate();


    const handleStudentClick = () => {
        navigate('/studentlogin');
    }
    const handleTeacherClick = () => {
        navigate('/teacherlogin');
    }

    const handleOnClick = () => {
        navigate('/adminlogin');
    }



    return (

        <>

            <div className={styles.Navbar} >
                <h1>GBPIET  GhurDarui Pauri Garhwal</h1>
                <button className={styles.button} onClick={handleOnClick} > Admin LogIn</button>
            </div>

            <div className={styles.container}>

                <h1>Are you a ? </h1>
                <div style={{
                    display: 'flex',
                    gap: '3rem'
                }}>
                    <button onClick={handleStudentClick} className={styles.studentloginbutton}>Student</button>
                    <button onClick={handleTeacherClick} className={styles.teacherloginbutton} >Teacher</button>

                </div>

            </div>


        </>

    )
}

export default Login
