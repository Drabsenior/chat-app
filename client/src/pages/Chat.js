import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Contacts from '../components/Contacts'
import { getAlluser } from '../utils/APIRoutes'

const Chat = () => {
  const [contacts,setContacts] = useState([])
  const [currentUser,setCurrentUser] = useState(undefined)
  const [isLoading,setIsLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(()=>{
   const getCurrentUser = async ()=>{
  if(!localStorage.getItem('chat-app-user')){
    navigate('/login')
  }else{
    setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')))
    setIsLoading(false)
  }
   }
   getCurrentUser()
  },[])
  useEffect(()=>{
    const getAllusers = async()=>{
     if(currentUser){
      if(currentUser.isAvatarImageSet){
        const users = await axios.get(`${getAlluser}/${currentUser._id}`)
         setContacts(users.data)
     
      }else{
        navigate('/setavatar')
      }
     }
    }
    getAllusers()
  },[currentUser])

  return (
    <Container>
      <div className="container">
        {!isLoading && (

          <Contacts contacts={contacts}  currentUser={currentUser}/>
        )}
      </div>
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
  gap: 1rem;
  background-color: #131324;
  
  .container {
    height:85vh;
    width:85vw;
    background-color:#00000076;
    display:grid;
    grid-template-rows: 25% 75%;
    @media screen and (min-width:720px) and (max-width:1080px){
      grid-template-rows:35% 65%;
      
    }
  }
`

export default Chat