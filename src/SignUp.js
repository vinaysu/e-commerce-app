import React, { useState, useRef } from 'react'
import { TextField, Button } from '@mui/material'
import './Common.css'
import { Link, useNavigate } from 'react-router-dom'

function SignUp() {
  const navigate = useNavigate()
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const mobileRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);


  const [registerData, setRegisterData] = useState(
    {
      name: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: ''
    }
  )

  function handleChange(event) {

    const { name, value } = event.target

    setRegisterData(
      prev => ({ ...prev, [name]: value })
    )
  }

  function handleSignUp() {
    const emptyFields = [];

    function handleFields() {
      for (let key in registerData) {
        if (registerData[key] == '') {
          emptyFields.push(key);

          return false
        }
      }

      return true
    }



    if (handleFields()) {
      if (registerData.password !== registerData.confirmPassword) {
        window.alert("Passwords Does't Match")
        return
      }
      navigate('/login')
      window.alert('Successfully registered')
      localStorage.setItem('registerData', JSON.stringify(registerData))
      setRegisterData({
        name: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: ''
      });
      // console.log(registerData)

    }
    else {

      window.alert('All the Fiels are Mandatory')


      emptyFields.map(field => {
        switch (field) {
          case 'name':
            nameRef.current.focus();
            break;
          case 'email':
            emailRef.current.focus();
            break;
          case 'mobile':
            mobileRef.current.focus();
            break;
          case 'password':
            passwordRef.current.focus();
            break;
          case 'confirmPassword':
            confirmPasswordRef.current.focus();
            break;
          default:
            break;
        }
      })




    }

  }

  return (
    <div className='container' >
      <h1>Register Here</h1>
      <TextField value={registerData.name} inputRef={nameRef} name='name' onChange={handleChange} sx={{ borderRadius: '3px' }} variant='standard' required placeholder='Enter the FullName' label='Full Name' />
      <TextField value={registerData.email} inputRef={emailRef} name='email' onChange={handleChange} sx={{ borderRadius: '3px' }} variant='standard' required placeholder='Enter the Mail' label='Email' />
      <TextField value={registerData.mobile} inputRef={mobileRef} name='mobile' onChange={handleChange} sx={{ borderRadius: '3px' }} variant='standard' required placeholder='Enter the Mobile Number' label='Mobile Number' />
      <TextField value={registerData.password} inputRef={passwordRef} name='password' onChange={handleChange} sx={{ borderRadius: '3px' }} variant='standard' required placeholder='Enter the Password' label='Password' />
      <TextField value={registerData.confirmPassword} inputRef={confirmPasswordRef} name='confirmPassword' onChange={handleChange} sx={{ borderRadius: '3px' }} variant='standard' required placeholder='Enter the Password Again' label='Confirm Password' />
      <Button onClick={handleSignUp} sx={{ borderRadius: '3px', color: 'white' }} variant='outlined' >SignUp</Button>
      <Link className='link' to={'/login'} >Login/SignIn</Link>
    </div>
  )
}

export default SignUp