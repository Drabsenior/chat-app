import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import styled from 'styled-components'
import loader from '../assets/loader.gif'
import  { Buffer } from 'buffer'
import { setAvatarRoute } from '../utils/APIRoutes';
const SetAvatar = () => {
    const api = 'https:/api.multiavatar.com/35323'
    const [avatars,setAvatars]=useState([])
    const [selectedAvatar,setSelectedAvatar]=useState(undefined)
    const [isLoading , setIsLoading] = useState(true)
    const navigate = useNavigate()
    const toastOptions = {
    position:"top-right",
    draggable:true,
    pauseOnHover:true,
    theme:"dark",
    autoClose:5000,
  }
  useEffect(()=>{
    if(!localStorage.getItem('chat-app-user')){
        navigate('/login')
    }
  })
  const setProfilePicture = async()=>{
   if(selectedAvatar === undefined){
    toast.error('Select avatar profile',toastOptions)
   }else{
    const user = await JSON.parse(localStorage.getItem('chat-app-user'))
    const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{image: avatars[selectedAvatar]})
     console.log(data);
    if( data.isSet){
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem('chat-app-user',JSON.stringify(user))
        navigate('/')
    }else{
        toast.error('Error setting profile, please try again',toastOptions)
    }
}
  }
   useEffect( ()=>{
    const fetchAvatars = async()=>{

        const data = []
        for(let i=0;i<4;i++){
            const image = await axios.get(`${api}/${Math.round(Math.random()*1000)}`)
            const buffer = new Buffer(image.data)
            data.push(buffer.toString('base64'))

        }
        setAvatars(data)
        setIsLoading(false)
        
    }
    fetchAvatars()
   },[])
    
    return (
        <>
       <Container>
       {isLoading ? (<div className='loader'> 
       <img src={loader} alt="loading.." />
       </div>) : (
           <>
        <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
        </div>
        <div className="avatars">
       {avatars.map((avatar,index)=>(
           <div className={`avatar ${selectedAvatar === index ? "selected" : ""}`} key={index}>
            <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={()=>setSelectedAvatar(index)}/>
        </div>
       ))}
        </div>
        <button className='submit-btn' onClick={()=>setProfilePicture()}>Set Profile Picture</button>
       </>
        )}
    </Container>
    <ToastContainer/>
        </>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader{
    max-inline-size: 100%;
  }
  .title-container{
      h1{
          color: white;
        }
    }
   .avatars{
    display: flex;
    gap: 2rem;
   }

   .avatar{
    border: 0.4rem solid transparent;
    padding: 0.4rem;
    border-radius: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s ease-in-out;
    img{
        height: 6rem;
    }
   }
   .selected{
    border: 0.4rem solid #4e0eff;
   }
   .submit-btn{
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

`

export default SetAvatar