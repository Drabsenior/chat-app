import React, { useState } from 'react'
import styled from 'styled-components'
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'
import Picker from 'emoji-picker-react'

const ChatInput = ({handleSendMessage}) => {
    const [showEmojiPicker,setShowEmojiPicker] = useState(false)
    const [msg,setMsg] = useState('')

    const handleShowEmojiPicker = ()=>{
        setShowEmojiPicker(!showEmojiPicker)
    }

    const handleEmojiClick = (event,emoji)=>{
      let message =msg;
      message += emoji.emoji
      console.log(message);
      console.log(emoji)
      console.log(emoji.unified);
      setMsg(message)
    }
    const sendChat = (e)=>{
        e.preventDefault()
        handleSendMessage(msg)
        setMsg('')
    }
  return (
    <Container  >
        <div className="button-container" >
            <div className="emoji">
                <BsEmojiSmileFill onClick={handleShowEmojiPicker}/>
                {showEmojiPicker && <Picker emojiStyle='google' onEmojiClick={handleEmojiClick}/>}
            </div>
        </div>
        <form className='input-container' onSubmit={sendChat}>
             <input type="text" placeholder='Type your message here...' onClick={()=>setShowEmojiPicker(false)}  value={msg} onChange={(e)=>setMsg(e.target.value)} onKeyDown={(e)=>e.key === 'Enter' ? sendChat(e): null}/>
             <button className="submit">
                <IoMdSend/>
             </button>
        </form>
    </Container>
  )
}
const Container = styled.div`
     display: grid;
     grid-template-columns: 5% 95%;
     background-color: #080420;
     align-items: center;
     padding: 0 2rem;
     padding-bottom: 0.3rem;
     .button-container{
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;
        .emoji{
            position: relative;
            svg{
                font-size: 1.5rem;
                color: #ffff00c8;
                cursor: pointer;
            }
            .EmojiPickerReact {
                position: absolute;
                bottom: 40px;
                background-color: #080420;
                box-shadow: 0 5px 10px #9a86f3;
                border-color: #9186f3;
                .emoji-categories{
                    button{
                        filter: contrast(0);
                    }
                }
                .epr-search{
                    background-color: transparent;
                    border-color: #9186f3;
                }
                .epr-emoji-category-label{
                    background-color: #080420;
                }
                .epr-body::-webkit-scrollbar{
                   background-color: #080420;
                   width: 5px;
                   &-thumb{
                    background-color: #9186f3;
                    border-radius: 1rem;
                   }
                }
            }
        }
     }
     .input-container{
        display: flex;
        align-items: center;
        width: 100%;
        border-radius: 2rem;
        background-color: #ffffff34;
        gap: 2rem;
        input{
            width: 90%;
            height: 60%;
            background-color: transparent;
            border: none;
            color: white;
            padding-left: 1rem;
            font-size: 1.2rem;
            &::selection{
                background-color: #9186f3;
            }
            &:focus{
                outline: none;

            }
        }
        button{
            padding: 0.3rem 2rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #9a86f3;
            border: none;
            cursor: pointer;
            svg{
                font-size: 2rem;
                color: white;
            }
        }

     }
`

export default ChatInput