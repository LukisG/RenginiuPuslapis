import React, { useState, useEffect } from "react";
import "./Login.css";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../auth/authSlice'
import Spinner from '../Spinner'
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

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {

      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }
    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <NextUIProvider theme={darkTheme}>
      <Grid.Container gap={3} justify="center">
        <Grid sm={12} md={12} lg={6}>
          <Card color="inherit">
            <Card.Header>
              <Text h1>Prisijungimas</Text>
            </Card.Header>
            <Divider />
            <form onSubmit={onSubmit}>
              <Card.Body css={{ py: "$15" }}>

                <Input clearable bordered color="success" status="success"
                  labelPlaceholder="Elektroninio pašto adresas"
                  type="email"
                  name='email'
                  id='email'
                  value={email}
                  onChange={onChange} />
                <Spacer y={2} />
                <Input clearable bordered color="success" status="success"
                  labelPlaceholder="Įveskite slaptažodį"
                  type="password"
                  name='password'
                  id='password'
                  value={password}
                  onChange={onChange} />

              </Card.Body>
              <Divider />
              <Card.Footer>
                <Row justify="flex-end">
                  <Button flat auto rounded onClick={(e) => navigate(`/`)} size="sm" color="error">
                    Grįžti atgal
                  </Button>
                  <Button flat auto rounded type="submit" color="success" size="sm">Prisijungti</Button>
                </Row>
              </Card.Footer>
            </form>
          </Card>
        </Grid>
      </Grid.Container>
    </NextUIProvider>
  );
}
export default Login