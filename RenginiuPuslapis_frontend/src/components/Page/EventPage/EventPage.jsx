import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RegModal from "../eventReg/RegModal";
import { useNavigate } from "react-router-dom";
import "../../style.css";
import axios from "axios";
import toast from 'react-hot-toast';
import {
  NextUIProvider,
  createTheme,
  Grid,
  Text,
  Row,
  Card,
  Button,
  Divider,
} from "@nextui-org/react";
const darkTheme = createTheme({
  type: "dark",
});
const EventPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState([]);
  const [userdata, setUserdata] = useState([])
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (localStorage.user) setUserdata(JSON.parse(localStorage.user))
    const fetchdata = async () => {
      const response = await fetch(`http://127.0.0.1:5000/api/events/event/${id}`)
      const eventdata = await response.json();
      setEvent(eventdata.responseBody.event);
    };
    fetchdata();
  }, [id]);
  const addparticipant = async () => {
    const tempitem = { email: `${userdata.email}`, };
    const REG_URL = `http://127.0.0.1:5000/api/events/event/:${id}/participant/`
    const response = await axios.post(REG_URL, tempitem)
      .catch(function (error) {
        if (error.response) {
          toast.error(error.response.data.responseBody.message)
        }
      });
    if (response.status === 200) toast.success("succesfully registered!")
  }
  return (
    <NextUIProvider theme={darkTheme}>
      {openModal && <RegModal closeModal={setOpenModal} eventid={id} openModal={openModal}/>}
      <Text size={50} css={{
        textGradient: "45deg, $blue500 -20%, $pink500 50%",
      }}
        weight="bold">Renginio informacija:</Text>
      <Grid.Container gap={1} justify="center" className="band">
        <Grid lg={6} xs={12} sm={12}>
          <Card hoverable cover css={{ w: "100%" }}>
            <Card.Header
              css={{ position: "absolute", zIndex: 1, top: 5 }}
            ></Card.Header>
            <Card.Body>
              <Card.Image
                src={event.eventPhoto}
                height={500}
                width="100%"
                alt="haha"
              />
            </Card.Body>
          </Card>
          <Card>
            <Card.Header css={{}}>
              <Row justify="center">
                <Text>
                  {" "}
                  Renginys: {event.eventName}{" "}
                  {event.dateTime
                    ? " " +
                    event.dateTime.slice(0, 10) +
                    " " +
                    event.dateTime.slice(11, 16)
                    : "no time present"}
                </Text>
              </Row>
            </Card.Header>
            <Divider />
            <Card.Body css={{}}>
              <Row justify="left">
                <Text>
                  {event.eventDescription}
                </Text>
              </Row>
            </Card.Body>
            <Divider />
            <Card.Footer>
              <Row justify="center">
                <Button color="error" size="sm" flat auto rounded onClick={(e) => navigate(`/`)}>
                  Grįžti atgal
                </Button>
                <Button color="success" size="sm" flat auto rounded
                  onClick={() => !localStorage.user ? setOpenModal(true) : setOpenModal(false) + addparticipant()}> Registruotis renginiui
                </Button>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>
    </NextUIProvider>
  );
};

export default EventPage;
