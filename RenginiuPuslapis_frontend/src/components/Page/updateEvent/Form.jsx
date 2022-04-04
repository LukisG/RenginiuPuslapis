import React, { useState } from 'react'
import UpdateEventForm from './UpdateEventForm'
import UpdateEventSuccess from './UpdateEventSuccess'

const Form = () => {

  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const [responsecorrect, setResponsecorrect] = useState(false);

  const submitForm = () => {
    setFormIsSubmitted(true)
  }
  const [formdataset, setFormdataset] = useState([]);
  return (
    <div>
      {!formIsSubmitted && !responsecorrect ? <UpdateEventForm submitForm={submitForm} setFormdataset={setFormdataset} setResponsecorrect={setResponsecorrect} /> : <UpdateEventSuccess formdataset={formdataset} />}
    </div>
  )
}

export default Form