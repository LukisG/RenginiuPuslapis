import React from "react";
import "../../style.css";
import {
  NextUIProvider,
  createTheme,
  Collapse,
  Text,
  Link,
  Spacer,
  Row,
  Col,
  Container,
} from "@nextui-org/react";
const darkTheme = createTheme({
  type: "dark",
});
const today = new Date();
const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
const Team = [
  [
    ['Lukas Gružauskas', 'https://github.com/LukisG'],
    ['Martynas Inapas', 'https://github.com/inapas'],
    ['Kęstas Daukantas', 'https://github.com/xnewme'],
    ['Arnoldas Reklys', 'https://github.com/trap69'],
    ['Mantas Gudaitis', 'https://github.com/mantasgood'],
    ['Lukas Kalesinskas', 'https://github.com/zliukas'],
    ['Aivaras Štefariuk', 'https://github.com/Governoid']
  ],
  [
    ['Modestas Stravinskas', 'https://github.com/Modemonger'],
    ['Dovilė Daulenskienė', 'https://github.com/Dovile-D'],
    ['Justas Sadauskis', 'https://github.com/codingfullstack'],
    ['Kornelijus Šliubauskas', 'https://github.com/kornelijussl']
  ],
]
export default function About() {
  return (
    <NextUIProvider theme={darkTheme}>
      <Container fluid AlignItems="center" gap={2}>
        <Row>
          <Col>
            <Text h1>Apie projektą:</Text>
          </Col>
        </Row>
        <Collapse.Group bordered>
          <Collapse title="Projektas">
            <Text>Projektas buvo kuriamas mokymosi tikslais.
              <Spacer />
              Projektas pradėtas kurti: 2022-03-08
              Šiuo metu (<span className="underline">{`${date}`}</span>) projektas yra Baigtas, projekto
              versija: <span className="underline">1.0</span>, panaudotos technologijos:
              <Spacer />
              <Link color="success" href="https://nodejs.org/en/" icon target="_blank">NodeJS</Link>
              <Spacer />
              <Link color="success" href="https://www.expressjs.com/" icon target="_blank">expressJS</Link>
              <Spacer />
              <Link color="success" href="https://www.mongodb.com/" icon target="_blank">mongoDB</Link>
              <Spacer />
              <Link color="success" href="https://reactjs.org/" target="_blank" icon>React</Link>
            </Text>
          </Collapse>
          <Collapse title="Komanda">
            <Text>
              Prie projekto dirba 12 žmonių, 5 žmonės atsakingi už backend'ą ir 7
              atsakingi už frontend'ą
            </Text>
            <Spacer />
            <Text>Frontend Komanda: </Text>
            {Team[0].map((item, index) => {
              return (
                <div>
                  <Link href={item[1]}><Text color='success'>{item[0]} </Text></Link>
                </div>
              )
            })}
            <Spacer />
            <Text>Backend Komanda: </Text>
            {Team[1].map((item, index) => {
              return (
                <div>
                  <Link href={item[1]}><Text color='success'>{item[0]} </Text></Link>
                </div>
              )
            })}
          </Collapse>
          <Collapse title="Versijavimas">
            <Text>
              Projektas kuriamas mokymosi tikslais.
              <Spacer />
              Projekto repositoriją galite rasti adresu:
              <Spacer />
              <Link color="success" href="https://github.com/KITM-JS21" target="_blank" icon>Github</Link>
            </Text>
          </Collapse>
        </Collapse.Group>
      </Container>
    </NextUIProvider>
  );
}
