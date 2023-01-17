import React, { useState } from 'react'
import styled from 'styled-components'

const Contacts = ({contacts,currentUser}) => {
    const [currentUsername,setCurrentUsername] = useState(undefined)
    const [currentAvatarImage,setCurrentAvatarImage] =useState(undefined)
    const [currentSelected,setCurrentSelecte] = useState(undefined)

    if(currentUser){
        setCurrentUsername(currentUser.userName)
        setCurrentAvatarImage(currentUser.avatarImage)
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
                  <div className={`contact ${index === currentSelected ? 'selected': ""}`} key={index}>
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
                        <h3>{currentUsername}</h3>
                     </div>
                </div>

                </Container>
                )
            
            }
            </>
            
           
        }

const Container = styled.div``

export default Contacts