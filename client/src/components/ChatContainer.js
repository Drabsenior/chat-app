import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import ChatInput from './ChatInput'
import Logout from './Logout'
import Messages from './Messages'
import { addMessage, getAllMessage } from '../utils/APIRoutes'
import {v4 as uuidv4} from 'uuid'

const ChatContainer = ({currentChat,currentUser,socket}) => {
    const scrollRef = useRef()
    const [messages,setMessages] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [arrivalMessages,setArrivalMessages]=useState([])
    const handleSendMessage = async (msg)=>{
     const response = await axios.post(addMessage,{
        from:currentUser._id,
        to:currentChat._id,
        message:msg
      })
      socket.current.emit('send-msg',{
        to:currentChat._id,
        from:currentUser._id,
        message:msg
      })

      const msgs = [...messages]
      msgs.push({fromSelf:true,message:msg})
      setMessages(msgs)
    }
    useEffect(()=>{
     if(socket.current){
        socket.current.on('msg-recieve',(msg)=>{
            setArrivalMessages({fromSelf:false,message:msg})

        })
     }
    },[])

    useEffect(()=>{
    arrivalMessages && setMessages((prev)=>[...prev,arrivalMessages])

    },[arrivalMessages])
     
    useEffect(()=>{
     scrollRef.current?.scrollIntoView({behaviour:'smooth'})

    },[messages])
    useEffect(()=>{
        if(currentChat){

            const getAllmessages = async()=>{
                const response =  await axios.post(getAllMessage,{
                    from:currentUser._id,
                    to:currentChat._id
                })
                
                setMessages(response.data)
                setIsLoading(false)
            }
            getAllmessages()
        }
    },[currentChat])
  return (
    <>
   {currentChat && (

        <Container>
        <div className="chat-header">
            <div className="user-details">
                <div className="avatar">
                    <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatarimage" />
                </div>
                <div className="username">
                    <h3>{currentChat.userName}</h3>

                </div>
            </div>
            <Logout/>
        </div>
            <div className="chat-messages">
              {
                isLoading ? <><h1>loading...</h1></>: <>
                {
                    messages.map((message)=>{
                        return(
                            <div ref={scrollRef} key={uuidv4}>
                                <div className={`message ${message.fromSelf ? 'sended' : 'recived'}`}>
                                    <div className="content">
                                    <p>
                                        {message.message}
                                    </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                </>
              }
            </div>

       <ChatInput handleSendMessage = {handleSendMessage}/>
    </Container>
  )
 } </>
  )

}

const Container = styled.div`
       padding-top: 1rem;
       display: grid;
       grid-template-rows: 10% 78% 12%;
       gap: 0.1rem;
       overflow: hidden;
         @media screen and (min-width: 720px) and (max-width: 1080px) {
        grid-template-rows:15% 70% 15%;
       }
      .chat-header{
         display: flex;
         justify-content: space-between;
         align-items: center;
         padding: 0 2rem;
         .user-details{
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar{
                img{
                    height: 3rem;
                }
            }
         }
         .username{
            h3{
                color: white;
            }
         }
       }
       .chat-messages{
        padding: 1rem 2rem;
        gap: 1rem;
        display: flex;
        flex-direction: column;
        overflow: auto;
        ::-webkit-scrollbar{
            width: 0.3rem;
            &-thumb{
                background-color: #ffffff39;
                width: 0.2rem;
                border-radius: 3rem;
            }
        }
        .message{
            display: flex;
            align-items: center;
            .content{
                max-width: 40%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size: 1.1rem;
                border-radius: 1rem;
                color: #d1d1d1;
            }
        }
        .sended{
            justify-content: flex-end;
            .content{
                background-color: #4f04ff21;
            }
        }
        .recived{
            justify-content: flex-start;
            .content{
                background-color: #9900ff20;
            }
        }
       }
       
`

export default ChatContainer