import React, { useEffect, useState } from "react";
import "./Style.css";
import { useNavigate } from "react-router-dom";
import {
  createTheme,
  NextUIProvider,
  Button,
  Card,
  Grid,
  Col,
  Text,
  Row,
  Tooltip,
} from "@nextui-org/react";
import { HeartIcon } from "./HeartIcon";
const darkTheme = createTheme({
  type: "dark",
});
const Home = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch(`http://127.0.0.1:5000/api/events/`);
      const eventdata = await response.json();
      setEvents(eventdata.responseBody.events);
    };
    fetchdata();
  }, []);

  return (
    <NextUIProvider theme={darkTheme}>
      <Grid.Container gap={1} justify="flex-start" className="band">
        {events[0] ? (
          events.map((item, index) => {
            return (
              <Grid lg={4} xs={12} sm={4} key={index}>
                <Card hoverable cover css={{ w: "100%" }}>
                  <Card.Header
                    css={{ position: "absolute", zIndex: 1, top: 5 }}
                  ></Card.Header>
                  <Card.Body>
                    <Card.Image
                      src={
                        item.eventPhoto
                          ? item.eventPhoto
                          : "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17fa8a3c75a%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3Avar(--bs-font-sans-serif)%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17fa8a3c75a%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22108.5390625%22%20y%3D%2297.5%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                      }
                      height={300}
                      width="100%"
                      alt="haha"
                    />
                  </Card.Body>
                  <Card.Footer
                    blur
                    css={{
                      position: "absolute",
                      bgBlur: "#8696A8",
                      borderTop:
                        "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                      bottom: 0,
                      zIndex: 1,
                    }}>
                    <Row>
                      <Col span="9">
                        <Text color="light" size={17}>
                          {item.eventName}
                        </Text>
                      </Col>
                      <Col>
                        <Tooltip
                          content={
                            "Tiksli data paspaudus ant 'Susidomėjai' nuorodos"
                          }
                          rounded
                          placement="topStart"
                          color="success"
                        >
                          <Text color="light" size={17}>
                            {item.dateTime
                              ?
                              item.dateTime.slice(0, 9) +
                              "?"
                              : "nėra renginio datos"}
                          </Text>
                        </Tooltip>
                      </Col>
                      <Col>
                        <Tooltip
                          content={
                            "Daugiau informacijos apie renginį paspaudus ant šios nuorodos"
                          }
                          rounded
                          color="success"
                        >
                          <Button
                            flat
                            auto
                            rounded
                            color="success"
                            icon={<HeartIcon fill="currentColor" filled />}
                            onClick={(e) =>
                              navigate(`/event/${e.currentTarget.id}`)
                            }
                            id={item._id}
                          >
                            <Text
                              css={{ color: "inherit" }}
                              size={12}
                              weight="bold"
                              transform="uppercase"
                            >
                              Susidomėjai?
                            </Text>
                          </Button>
                        </Tooltip>

                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Card clickable bordered css={{ mw: "400px" }}>
            <p onClick={(e) => navigate(`/addevent`)}>
              Renginių nėra :( Būk pirmas ir sukurk renginį!
            </p>
          </Card>
        )}
      </Grid.Container>
    </NextUIProvider>
  );
};

export default Home;
