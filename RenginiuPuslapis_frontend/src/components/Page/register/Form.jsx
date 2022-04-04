import React, { useState } from 'react'
import RegisterForm from './RegisterForm'
import RegistrationSuccess from './RegistrationSuccess'

const Form = () => {

  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const [dataiscorrect, setDataiscorrect] = useState(false);
  const submitForm = () => {
    setFormIsSubmitted(true)
  }
  return (
    <div>
      {!formIsSubmitted && !dataiscorrect ? <RegisterForm submitForm={submitForm} setDataiscorrect={setDataiscorrect} /> : <RegistrationSuccess />}
    </div>
  )
}

export default Form