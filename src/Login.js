import React, { useState, useRef } from 'react'
import { TextField, Button } from '@mui/material'
import { Link } from 'react-router-dom'

function Login() {

  const [loginMail, setLoginMail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  function handleLogin() {
    let newData = JSON.parse(localStorage.getItem('registerData'))
    console.log(newData)
    if (loginMail == '' || loginPassword == '') {

      if (loginMail == '') {
        emailRef.current.focus()
      } else {
        passwordRef.current.focus()
      }
      window.alert('Fields are Mandatory')

      return
    }

    if (newData.email == loginMail && newData.password == loginPassword) {
      setLoginMail('')
      setLoginPassword('')
      window.alert('Logged In Successfully')
    } else {
      window.alert('Details not Found Please SignUp')
      setLoginMail('')
      setLoginPassword('')
    }

    console.log(newData)
  }

  function handleForget() {

    let lData = localStorage.getItem('registerData')

  }



  return (
    <div className='container' >

      <h1>Login Here</h1>
      <TextField inputRef={emailRef} value={loginMail} onChange={(event) => setLoginMail(event.target.value)} name='loginMail' sx={{ borderRadius: '3px' }} variant='standard' required placeholder='Enter the Mail' label='Email' />
      <TextField inputRef={passwordRef} value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} name='loginPassword' sx={{ borderRadius: '3px' }} variant='standard' required placeholder='Enter the Password' label='Password' />
      <Button onClick={handleLogin} sx={{ borderRadius: '3px', color: 'white', marginTop: '10rem' }} variant='outlined' >Login</Button>
      <Link className='link' to={'/'} >SignUp</Link>
      <caption onClick={handleForget} >Forget Password</caption>

    </div>
  )
}

export default Login