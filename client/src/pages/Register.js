import React, { useEffect, useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { registerRoute } from '../utils/APIRoutes';
const Register = () => {
  const navigate =useNavigate()

  useEffect(()=>{
   if(localStorage.getItem('chat-app-user')){
    navigate('/')
   }
  },[])
  const [formData,setFormData] = useState({
    userName:"",
    email:"",
    password:"",
    confirmPassword:""


  })
  const toastOptions = {
    position:"top-right",
    draggable:true,
    pauseOnHover:true,
    theme:"dark",
    autoClose:5000,
  }
  const handleSubmit= async (e)=>{
   e.preventDefault()
   

   if(handleValidation()){
    const {userName,email,password} = formData;
    
    const user = {
      userName,
      email,
      password
    }
    const {data} = await axios.post(registerRoute,user)
    if(data.status === false){
      toast.error(data.msg,toastOptions)
    }else if( data.status === true){
      localStorage.setItem('chat-app-user',JSON.stringify(data.user))
      navigate("/")

    }
    

    console.log(data);
   }
   

  }
  const handleValidation = ()=>{
    const {userName,email,password,confirmPassword} = formData;
    if(userName.length < 3){
      toast.error('Username should be minimum 3 characters', toastOptions);
      console.log(userName.length)
     return false
     
    }else if(confirmPassword !== password){
      toast.error('Passwords do not match', toastOptions);
      
      return false
    } 
    
    else if(password.length < 8 ){
      toast.error('Password should be minimum of 8 characters', toastOptions);

      return false
    }
    else {
      return true 
    }
    
  }
  const handleChange= (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  return (
    <>
  <FormContainer>
    <form  onSubmit={e=>handleSubmit(e)}>
     <div className="brand">
      <img src='https://raw.githubusercontent.com/koolkishan/chat-app-react-nodejs/49409cf75ba2a6e0b3317a1351ab6685a263dc18/public/src/assets/logo.svg' alt="Logo" />
      <h1>Snappy</h1>

     </div>
     <input type="text"  placeholder='Username' name='userName' onChange={e=>handleChange(e)}   />
     <input type="email"  placeholder='Email' name='email' onChange={e=>handleChange(e)}   />
     <input type="password"  placeholder='Password' name='password' onChange={e=>handleChange(e)}   />
     <input type="password"  placeholder='Password' name='confirmPassword' onChange={e=>handleChange(e)}   />
     <button type='submit'>create account</button>

     <span>Already have an account <Link to='/login'>Login</Link></span>

    </form>
  </FormContainer>
  <ToastContainer/>
    </>
  )
}

const FormContainer = styled.div`
  height:100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;
  .brand{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  img{
    height: 5rem;
  }
  h1{
    color: white;
    font-size: 1.5rem;
    text-transform: uppercase;

  }
  form{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    padding: 3rem 5rem;
    border-radius: 2rem;
  }
  input{
    background-color: transparent;
    padding: 0.6rem 0.6rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus{
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button{
    background-color: #997af0;
    cursor: pointer;
    padding: 1rem 2rem;
    text-transform: uppercase;
    border-radius: 0.4rem;
    color: white;
    font-weight: bold;
    border: none;
    transition:0.5s ease-in-out ;
    &:hover{
      background-color: #4e0eff;

    }
  }
  span{
    color: white;
    text-transform: uppercase;
    a{
      text-decoration: none;
      color: #4e0eff;
      font-weight: bold;
    }
  }
`

export default Register