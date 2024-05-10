import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Styles/Adminlogin.module.css'

const AdminLoign = () => {
  return (
    <>
    
    <div className={styles.container}>
       
       <div className={styles.main}>
           <h2>Login</h2>

           <input type="text" placeholder='Enter your email' />
           
        
           <input type="text" placeholder='Enter your password' />

           <button className={styles.button}>Login</button>
           <p>Don't have Account ? <Link className={styles.link} to="/adminsignup">Sign UP</Link></p>

       </div>
    </div>
    
    
    
    </>
  )
}

export default AdminLoign
