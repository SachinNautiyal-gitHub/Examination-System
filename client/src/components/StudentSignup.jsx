import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Styles/studentsignup.module.css'

const StudentSignup = () => {
  return (
   <>
   <div className={styles.container}>

    <div className={styles.main}>
        <h2>Sign UP</h2>
        
       
        <input type="text"  placeholder='Enter your Name' />

        
        <input type="text"  placeholder='Enter your Email' />

      
        <input type="text"  placeholder="Enter your Father's Name" />

       
        <input type="text"  placeholder='Create a Password' />

        
        <input type="text"  placeholder='Enter your Enrollment Number' />

        <button className={styles.button}>SignUP</button>
        <p>Already have an account ! <Link className={styles.link} to='/studentlogin'>LogIn</Link></p>

    </div>

    </div>
   </>
  )
}

export default StudentSignup
