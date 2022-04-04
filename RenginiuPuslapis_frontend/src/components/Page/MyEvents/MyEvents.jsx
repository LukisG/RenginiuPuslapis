import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./MyEvents.css";
import { RiImageAddLine } from "react-icons/ri";
import { BsTrash, BsPencil } from 'react-icons/bs'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';
import { logout, reset } from "../auth/authSlice";

import {
  NextUIProvider,
  createTheme,
  Grid,
  Text,
  Spacer,
  Col,
  Row,
  Card,
  Button,
  Input,
  Modal,
} from "@nextui-org/react";
const darkTheme = createTheme({
  type: "dark",
});

export default function MyEvents() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState([]);
  const [formData, setFormData] = useState({});
  const [userdata, setUserdate] = useState({});
  const [userEvents, setUserEvents] = useState([]);
  const [tempevent, setTempevent] = useState([]);

  const [visible, setVisible] = React.useState(false);
  const handler = (e) => {
    setVisible(true);
    setTempevent(userEvents.filter(item => item._id === e.target.offsetParent.id))
  }

  const closeHandler = () => {
    setVisible(false);
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onChangeUser = (e) => {
    setUserdate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  useEffect(() => {
    if (localStorage.user) { setUser(JSON.parse(localStorage.getItem('user'))) };
  }, [])

  const updateuserdata = async () => {
    if (!formData.email) {
      setFormData((prevState) => ({
        ...prevState,
        email: user.email,
      }))
    }

    const LOGIN_URL = 'http://127.0.0.1:5000/api/users/login/'
    const UPDATE_USER_INFO = `http://127.0.0.1:5000/api/users/update/${user.id}`
    const config = {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
    };

    const response = await axios.post(LOGIN_URL, formData).catch(function (error) {
      if (error.response) {
        toast.error("Wrong old password password!")
      }
    })

    if (response.data) {
      const response = await axios.patch(UPDATE_USER_INFO, userdata, config)
        .catch(function (error) {
          if (error.response) {
            toast.error(error.response.data.responseBody.message)
          }
        })
      if (response.status === 200) toast.success("Profile updated successfully!")
    }
  }

  const getuserevents = async () => {
    const response = await axios.get(`http://localhost:5000/api/events/event/user/:${user.id}`)
    setUserEvents(response.data.responseBody.userEvents)
  }

  useEffect(() => {

    if (user["id"]) {
      getuserevents()
    };

  }, [user])


  const deleateevent = async (e) => {
    const tempid = e.target.offsetParent.id
    const config = {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
    };
    const response = await axios.delete(`http://localhost:5000/api/events/event/${tempid}/delete`, config)
      .then(response => {
        if (response.status === 200) {
          toast.success("successfully deleated");
          navigate('/');
          navigate("/MyEvents");
        }

      })
      .catch(function (error) {
        if (error.response) {
          toast.error(error.response.data.responseBody.message)
        }
      })



  }
  const deleateuser = async () => {
    const config = {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
    };
    const response = await axios.delete(`http://localhost:5000/api/users/user/delete/${user.id}`, config)
      .catch(function (error) {
        if (error.response) {
          toast.error(error.response.data.responseBody.message)
        }
      })
    if (response.status === 200) {
      toast.success("successfully deleated")
    }
    const onLogout = () => {
      dispatch(logout());
      dispatch(reset());
      navigate("/");
    };
    onLogout()
  }
  return (
    <NextUIProvider theme={darkTheme}>
      <Text size={50} css={{
        textGradient: "45deg, $purple500 -20%, $pink500 100%",
      }}>Informacija apie tavo profilį:</Text>
      <Grid.Container gap={1} justify="center" className="band">
        <Grid lg={7} xs={12} sm={12}>
          <Card hoverable cover css={{ w: "100%" }}>
            <Card.Header
              css={{ position: "absolute", zIndex: 1, top: 5 }}
            ></Card.Header>
            <Card.Body>
              <Spacer y={2} />
              <Row fluid>
                <Spacer y={2} />
                <div className="settingsPP">
                  <Card.Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOxHlRNWb0ES9kzyByUNUry1jFGPIOtChSL6qyjx6GJVL-PSHOiIy2JFws-q286hpw_k4&usqp=CAU"
                    height={200}
                    width="100%"
                    alt="haha"
                  />
                  <label htmlFor="fileInput">
                    <i className="settingsPPIcon far fa-user-circle">
                      {" "}
                      <RiImageAddLine />{" "}
                    </i>{" "}
                  </label>
                </div>

                <Input
                  clearable
                  bordered
                  color="success"
                  status="success"
                  label="Vartotojo vardas:"
                  value={userdata.name}
                  placeholder={user.name}
                  type="text"
                  name="name"
                  id="name"
                  onChange={e => onChangeUser(e)}
                />
                <Spacer y={2} />
                <Input
                  clearable
                  bordered
                  color="success"
                  status="success"
                  label="El. pašto adresas"
                  type="email"
                  value={userdata.email}
                  placeholder={user.email}
                  name="email"
                  id="email"
                  onChange={e => {
                    onChangeUser(e);
                    onChange(e);
                  }}
                />
                <Spacer y={2} />
                <Input
                  clearable
                  bordered
                  color="success"
                  status="success"
                  label="Senas Slaptažodis"
                  type="password"
                  value={formData.password}
                  placeholder="old password"
                  name="password"
                  id="password"
                  onChange={e => onChange(e)}

                />
                <Spacer y={2} />
                <Input
                  clearable
                  bordered
                  color="success"
                  status="success"
                  label="Naujas Slaptažodis"
                  type="password"
                  value={userdata.password}
                  placeholder="new password"
                  name="password"
                  id="password2"
                  onChange={e => onChangeUser(e)}
                  css={{ marginRight: '10px' }}
                />
              </Row>
            </Card.Body>
            <Card.Footer>
              <Row justify="center">
                <Button color="error" size="sm" flat auto rounded onClick={() => deleateuser()}>
                  {" "}
                  Istrinti profili
                </Button>
              </Row>
              <Row justify="center">
                <Button color="success" size="sm" flat auto rounded onClick={() => updateuserdata()}>
                  {" "}
                  Atnaujinti profilio duomenis
                </Button>
              </Row>
            </Card.Footer>

          </Card>
        </Grid>
      </Grid.Container>

      <Text size={50}>{userEvents[0] ? "Tavo sukurti renginiai:" : "Dar neturite sukurtu savo renginiu!"}</Text>
      <Grid.Container gap={2} justify="flex-start">

        {userEvents[0] ? userEvents.map((item, index) => {
          return (
            <Grid lg={4} xs={12} sm={4} key={index} id={item._id}>
              <Card hoverable cover css={{ w: "100%" }}>
                <Card.Header
                  css={{ position: "absolute", zIndex: 1, top: 5 }}
                ></Card.Header>
                <Card.Body>
                  <Card.Image src={item.eventPhoto} height={300} width="100%" alt="haha" />
                </Card.Body>
                <Card.Footer
                  blur
                  css={{
                    bgBlur: "#8696A8",
                    borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                    bottom: 0,
                    zIndex: 1,
                  }}
                >
                  <Row>
                    <Col span="9">
                      <Text color="light" size={17}>
                        {item.eventName}
                      </Text>
                    </Col>
                    <Col>
                      <Text color="light" size={17}>
                        {item.dateTime
                          ? "" +
                          item.dateTime.slice(0, 10) +
                          " " +
                          item.dateTime.slice(11, 16) : "no date"}
                      </Text>
                    </Col>

                    <Col>
                      <Modal
                        closeButton
                        aria-labelledby="modal-title"
                        open={visible}
                        onClose={closeHandler}
                      >
                        <Modal.Header>
                          <Text id="modal-title" size={20} css={{
                            textGradient: "45deg, $yellow500 -20%, $red500 100%",
                          }}>
                            Dalyviai ir aprasymas
                          </Text>
                        </Modal.Header>
                        <Modal.Body>
                          <Row css={{ justifyContent: 'center', }}><Text size={20} css={{
                            marginTop: "10px",
                            textAlign: 'center',
                            textGradient: "45deg, $purple500 -20%, $pink500 100%",

                          }}>Aprasymas:</Text></Row>
                          <Row css={{ justifyContent: 'center', }}><Text size={16}>{tempevent[0] ? tempevent[0].eventDescription : <></>}</Text></Row>
                          <Row css={{ justifyContent: 'center', }}><Text size={20} css={{
                            marginTop: "10px",
                            textAlign: 'center',
                            textGradient: "45deg, $purple500 -20%, $pink500 100%",

                          }}>Dalyviai:</Text></Row>
                          <div>
                            {tempevent[0] && tempevent[0].eventParticipants[0] ? tempevent[0].eventParticipants.map((participant, index) => {
                              return (
                                <Row justify="space-between" key={index} css={{ justifyContent: 'center', }}>
                                  {participant.email}
                                </Row>
                              )
                            }) : <div>Dalyviu nėra</div>}
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button auto flat color="error" onClick={closeHandler}>
                            Close
                          </Button>

                        </Modal.Footer>

                      </Modal>

                    </Col>
                  </Row>
                </Card.Footer>
                <Card.Footer css={{ justifyContent: 'space-between' }}>
                  <Button
                    flat
                    auto
                    rounded
                    id={item._id}
                    color="success"
                    icon={<BsPencil fill="currentColor" filled />}
                    onClick={(e) => navigate(`/event/:${e.target.offsetParent.id}/update`)}
                  >
                    <Text
                      css={{ color: "inherit" }}
                      size={12}
                      weight="bold"
                      transform="uppercase"
                    >
                      Atnaujint rengini
                    </Text>
                  </Button>

                  <Button
                    flat
                    auto
                    rounded
                    id={item._id}
                    color="error"
                    icon={<BsTrash fill="currentColor" filled />}
                    onClick={e => deleateevent(e)}
                  >
                    <Text
                      css={{ color: "inherit" }}
                      size={12}
                      weight="bold"
                      transform="uppercase"
                    >
                      Istrinti rengini
                    </Text>
                  </Button>

                  <Button
                    flat
                    auto
                    rounded
                    id={item._id}
                    onClick={(e) => handler(e)}
                    color="primary"
                  >
                    Dalyviai ir aprasymas
                  </Button>
                </Card.Footer>
              </Card>

            </Grid>

          )
        }) : <></>}

      </Grid.Container>
    </NextUIProvider>
  );
}
