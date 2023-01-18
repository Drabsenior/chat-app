import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Contacts = ({contacts,currentUser,handleChatChange}) => {
    const [currentUsername,setCurrentUsername] = useState(undefined)
    const [currentAvatarImage,setCurrentAvatarImage] =useState(undefined)
    const [currentSelected,setCurrentSelecte] = useState(undefined)
    
    useEffect(()=>{

        if(currentUser){
            setCurrentUsername(currentUser.userName)
            setCurrentAvatarImage(currentUser.avatarImage)
        }
    },[])
    const changeCurrentChat = (contact,index)=>{
        setCurrentSelecte(index)
        handleChatChange(contact)


    }
    return <>
    { currentUsername && currentAvatarImage && (
        <Container>
            <div className="brand">
            <img src="https://raw.githubusercontent.com/koolkishan/chat-app-react-nodejs/49409cf75ba2a6e0b3317a1351ab6685a263dc18/public/src/assets/logo.svg" alt="logo" />
            <h3>snappy</h3>
            </div>
            <div className="contacts">
              {contacts.map((contact,index)=>(
                  <div className={`contact ${index === currentSelected ? 'selected': ""}`} key={index} onClick={()=>changeCurrentChat(contact,index)}>
                     <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                     </div>
                     <div className="username">
                        <h3>{contact.userName}</h3>
                     </div>
                    </div>
                ))}
             
                </div>

                <div className="current-user">
                    <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${currentAvatarImage}`} alt="avatar" />
                     </div>
                     <div className="username">
                        <h2>{currentUsername}</h2>
                     </div>
                </div>

                </Container>
                )
            
            }
            </>
            
           
        }

const Container = styled.div`
   display: grid;
   grid-template-rows: 10% 75% 15%;
   background-color: #080420;
   overflow: hidden;
   .brand{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img{
        height: 2rem;

    }
    h3{
        color: white;
        text-transform: uppercase;

    }
   }
   .contacts{
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar{
        width: 0.3rem;
        &-thumb{
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 1.3em;
            
        }
    }
    .contact{
        background-color: #ffffff39;
        min-height: 5rem;
        width: 90%;
        cursor: pointer;
        border-radius: 0.2rem;
        padding: 0.4rem;
        gap: 1rem;
        align-items: center;
        display: flex;
        transition: 0.5s ease-in-out;
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
    .selected{
        background-color: #9186f3;

    }


   }
   .current-user{
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar{
        img{
            height: 4rem;
            max-inline-size: 100%;
        }
    }
    .username{
        h2{
            color: white;
        }
    }
    @media screen and (min-width: 720px) and (max-width:1080px){
        gap: 0.5rem;
        .username{
            h2{
                font-size: 1rem;
            }
        }
    }
   }

`

export default Contacts