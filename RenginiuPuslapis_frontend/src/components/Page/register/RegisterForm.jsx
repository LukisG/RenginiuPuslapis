import React, { useState } from 'react'
import toast from 'react-hot-toast';
import validation from './validation'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./../../style.css";
import {
  NextUIProvider,
  createTheme,
  Grid,
  Text,
  Spacer,
  Row,
  Card,
  Button,
  Divider,
  Input,
} from "@nextui-org/react";
const darkTheme = createTheme({
  type: "dark",
});
const RegisterForm = ({ submitForm }) => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})

  const handleRegistrationSubmit = async (event) => {
    event.preventDefault()
    setErrors(validation(values))

    const newUser = {
      name: values.name,
      email: values.email,
      password: values.password
    }

    const response = await axios.post('http://localhost:5000/api/users/register', newUser)
      .catch(function (error) {
        if (error.response) {
          toast.error(error.response.data.responseBody.message)
        }

      })
    if (response.status === 201) {
      submitForm(true);
    }
  }
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }
  return (
    <NextUIProvider theme={darkTheme}>
      <Grid.Container gap={3} justify="center">
        <Grid sm={12} md={12} lg={6}>
          <Card color="inherit">
            <Card.Header>
              <Text h1>Registracija</Text>
            </Card.Header>
            <Divider />
            <form>
              <Card.Body css={{ py: "$15" }}>
                {errors.name && <p>{errors.name}</p>}
                <Input clearable bordered color="success" status="success"
                  labelPlaceholder="Prisijungimo vardas"
                  type="text"
                  name='name'
                  id='name'
                  value={values.name}
                  onChange={handleChange} />
                <Spacer y={2} />
                {errors.email && <p>{errors.email}</p>}
                <Input clearable bordered color="success" status="success"
                  labelPlaceholder="Elektroninio pašto adresas"
                  type="email"
                  name='email'
                  id='email'
                  value={values.email}
                  onChange={handleChange} />
                <Spacer y={2} />
                {errors.password && <p>{errors.password}</p>}
                <Input clearable bordered color="success" status="success"
                  labelPlaceholder="Slatažodis(min. 6 simboliai, sudarytas iš bent vieno skaičiaus, spec. simbolio, pvz: slaptazodis1!)"
                  type="password"
                  name='password'
                  id='password'
                  value={values.password}
                  onChange={handleChange} />

              </Card.Body>
              <Divider />
              <Card.Footer>
                <Row justify="flex-end">
                  <Button flat auto rounded onClick={(e) => navigate(`/`)} size="sm" color="error">
                    Grįžti atgal
                  </Button>
                  <Button flat auto rounded type="button" color="success" size="sm" onClick={handleRegistrationSubmit}>Registruotis</Button>
                </Row>
              </Card.Footer>
            </form>
          </Card>
        </Grid>
      </Grid.Container>
    </NextUIProvider>
  )
}

export default RegisterForm;