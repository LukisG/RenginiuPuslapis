import React from 'react'
import { useNavigate } from "react-router-dom";
import {
  NextUIProvider,
  createTheme,
  Text,
  Spacer,
  Button,
  Divider,

} from "@nextui-org/react";
const darkTheme = createTheme({
  type: "dark",
});
const EventCreationSuccess = () => {
  const navigate = useNavigate();

  return (
    <NextUIProvider theme={darkTheme}>
                <Text h1>Renginys sėkmingai atnaujintas!</Text>
                <Divider />
                <Spacer y={1}/>
                <Button flat auto rounded onClick={(e) => navigate(`/`)} size="sm" color="error">
                Grįžti atgal
              </Button>
    </NextUIProvider>
  )
}

export default EventCreationSuccess