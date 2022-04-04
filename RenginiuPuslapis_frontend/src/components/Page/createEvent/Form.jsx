import React, { useState } from 'react'
import CreateEventForm from './CreateEventForm'
import CreateEventSuccess from './CreateEventSuccess'

const Form = () => {

  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const [responsecorrect, setResponsecorrect] = useState(false);
  const submitForm = () => {
    setFormIsSubmitted(true)
  }
  const [formdataset, setFormdataset] = useState([]);
  return (
    <div>
      {!formIsSubmitted && !responsecorrect ? <CreateEventForm submitForm={submitForm} setFormdataset={setFormdataset} setResponsecorrect={setResponsecorrect} /> : <CreateEventSuccess formdataset={formdataset} />}
    </div>
  )
}

export default Form