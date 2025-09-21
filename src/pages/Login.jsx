import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setUsername } from '../redux/chatSlice'

function Login() {
    const dispatch=useDispatch()
    const navigate  = useNavigate()
    const [name,setName]=useState("")

const handleName=()=>{
  if(name.trim() !== ""){
  dispatch(setUsername(name))
  navigate('/chat')
  }else{
    alert("Please enter a name!!!")
    navigate('/')
  }
}



  return (
    <div className='bg-black h-screen p-3 flex flex-col justify-center items-center text-blue-900' style={{backgroundImage: `url('https://cdn.vectorstock.com/i/750p/77/01/social-media-chat-background-vector-30037701.avif')`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
        <h1 className='text-3xl py-8 '>Welcome to <span className='text-4xl text-pink-900 text-bold'>ChatZone</span></h1>
        <p className='py-5  mx-5' style={{fontStyle:'italic'}}>Connect instantly,  chat freely, and share moments <br className='md:hidden '/> <br className='md:hidden '/>   <span >— all in one place</span></p>
      <div className="text-center flex flex-col">
        <input type="text" className='my-5 p-2 border border-white/50 rounded shadow' placeholder='Name' onChange={(e)=>setName(e.target.value)} />
        <button className='bg-white py-3 rounded-full shadow hover:bg-pink-900 hover:text-white' onClick={handleName} >GET STARTED</button>
      </div>
    </div>
  )
}

export default Login
