import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MyEvents from "./components/Page/MyEvents/MyEvents";
import About from "./components/Page/about/About";
import "./components/Page/register/registerStyle.css"
import Form from "./components/Page/register/Form";
import Login from "./components/Page/Login/Login";
import Home from "./components/Page/home/Home";
import CreateEvent from "./components/Page/createEvent/Form";
import Contacts from "./components/Page/Contacts/Contacts";
import EventPage from './components/Page/EventPage/EventPage'
import UpdateEvent from './components/Page/updateEvent/Form'
// 1. Import `createTheme`
import { createTheme, NextUIProvider } from "@nextui-org/react"
import toast, { Toaster } from 'react-hot-toast';
function App() {
  return (
    <BrowserRouter>
      <Toaster />

      <Header />
      <Routes>
        <Route path="/*" /> {/* error elementas jei bus toks*/}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/renginiai" element={<Home />} />
        <Route path="/addevent" element={<CreateEvent />} />
        <Route path="/MyEvents" element={<MyEvents />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Form />} />
        <Route path="/event/:id" element={<EventPage />} />
        <Route path='/event/:id/update' element={<UpdateEvent />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;