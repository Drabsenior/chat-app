import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import {BiPowerOff} from 'react-icons/bi'
const Logout = () => {
    const navigate = useNavigate()
    const handleLogout = ()=>{
        localStorage.clear()
        navigate('/login')

    }
  return (
    <Button>
        <BiPowerOff onClick={handleLogout}/>

       
    </Button>
  )
}
const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    background-color:#9a86f3;
    svg{
        font-size: 1.3rem;
        color: #ebe7ff;
    }
`

export default Logout