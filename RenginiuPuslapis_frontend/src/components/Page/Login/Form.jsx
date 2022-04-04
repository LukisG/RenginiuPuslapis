import React, { useState } from 'react'
import Login from './Login'
import LoginSuccess from './LoginSuccess'

const Form = () => {

  const [formIsSubmitted, setFormIsSubmitted] = useState(false)

  const submitForm = () => {
    setFormIsSubmitted(true)
  }
  return (
    <div>
      {!formIsSubmitted ? <Login submitForm={submitForm} /> : <LoginSuccess />}
    </div>
  )
}

export default Form