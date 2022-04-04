import React from "react";
import { useNavigate } from "react-router-dom";
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
  Textarea,
} from "@nextui-org/react";
const darkTheme = createTheme({
  type: "dark",
});
const Contacts = () => {
  const navigate = useNavigate();
  return (
    <NextUIProvider theme={darkTheme}>
      <Grid.Container gap={3} justify="center">
        <Grid sm={12} md={12} lg={6}>
          <Card color="inherit">
            <Card.Header>
              <Text h1>Kontaktai</Text>
            </Card.Header>
            <Divider />
            <Card.Body css={{ py: "$5" }}>
              <form>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2294.3437964932477!2d23.916277616064487!3d54.896887765141976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e72276dd555557%3A0x2bf3519be19be30c!2sKauno%20Informacini%C5%B3%20technologij%C5%B3%20mokykla!5e0!3m2!1slt!2slt!4v1632728696090!5m2!1slt!2slt"
                  width="100%"
                  height="400px"
                  loading="lazy"
                ></iframe>
                <Spacer y={2} />
                <Input clearable bordered
                  color="success"
                  status="success"
                  labelPlaceholder="Jūsų vardas:"
                  type="text"
                  name='Name'
                  id='Name' />
                <Spacer y={2} />
                <Input clearable bordered
                  color="success"
                  status="success"
                  labelPlaceholder="Jūsų telefono numeris:"
                  type="text"
                  name='phoneNumber'
                  id='phoneNumber' />
                <Spacer y={2} />
                <Input clearable bordered
                  color="success"
                  status="success"
                  labelPlaceholder="Jūsų elektroninio pašto adresas:"
                  type="text"
                  name='email'
                  id='email' />
                <Spacer y={2} />
                <Textarea clearable bordered
                  type="text"
                  name='message'
                  id='message'
                  color="success"
                  status="success"
                  labelPlaceholder="Jūsų žinutė" />
                <Spacer y={2} />
              </form>
            </Card.Body>
            <Card.Footer>
              <Row justify="flex-end">
                <Button onClick={(e) => navigate(`/`)} size="sm" color="error">
                  Grįžti atgal
                </Button>
                <Button type="button" color="success" size="sm">Siųsti pranešimą</Button>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>
    </NextUIProvider>
  );
};

export default Contacts;
