import React from 'react'
import { useNavigate } from 'react-router-dom'

import {
  NextUIProvider,
  createTheme,
  Text,
  Button,
  Grid,
} from "@nextui-org/react";
const darkTheme = createTheme({
  type: "dark",
});
const RegistrationSuccess = () => {
  const navigate = useNavigate();
  return (
    <NextUIProvider theme={darkTheme}>
      <Grid.Container gap={1} justify="center" className="band">
        <Grid lg={7} xs={12} sm={0}>
          <Text h1 size={40}
            css={{
              textGradient: "45deg, $blue500 -20%, $pink500 50%",
              textAlign: 'center'
            }}
            weight="bold">Paskyra buvo sėkmingai sukurta! Galite dabar prisijunkti prie savo paskyros arba grysti į pagrindini puslapi ir naršyti toliau</Text>

        </Grid>
        <Grid xs={12} justify='center' >
          <Button auto ghost color="success" type="submit" success onClick={() => navigate("/login")}>Prisijunkti</Button>
        </Grid>
        <Grid xs={12} justify='center'>
          <Button auto ghost color="gradient" type="submit" success onClick={() => navigate("/")}>Grįžti Į Pagrindini puslapi</Button>
        </Grid>
      </Grid.Container>

    </NextUIProvider>

  )
}

export default RegistrationSuccess