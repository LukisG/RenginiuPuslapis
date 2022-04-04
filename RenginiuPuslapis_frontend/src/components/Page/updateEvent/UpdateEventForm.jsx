import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import { useParams } from "react-router-dom";
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
    Textarea
} from "@nextui-org/react";
const darkTheme = createTheme({
    type: "dark",
});

const CreateEventForm = ({ submitForm, setFormdataset }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [values, setValues] = useState({})
    const [image, setImage] = useState("")

    const formData = new FormData()
   
    const handleRegistrationSubmit = (event) => {
        if (image) {
            formData.append('file', image);
            formData.append('upload_preset', 'vw7xzkyq');
            const imguploadURL = ''; //image upload url here
            axios.post(imguploadURL, formData)
                .then((response) => {
                    event.preventDefault();
                    setImage(response.data.secure_url);
                    const config = {
                        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
                    };
                    const newEvent = {
                        user: JSON.parse(localStorage.getItem('user')).id,
                        eventPhoto: response.data.secure_url,
                        ...values,
                    };
                    setFormdataset(newEvent);
                    axios.patch(`http://127.0.0.1:5000/api/events/event/:${id}/update`, newEvent, config)
                        .catch(function (error) {
                            if (error.response) {
                                toast.error(error.response.data.responseBody.message)
                            }
                        })
                        .then(() => {
                            submitForm();
                        })


                    
                }).catch(error => {
                    toast.error(error.message);
                })
        } else {
            const config = {
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
            };
            const newEvent = {
                user: JSON.parse(localStorage.getItem('user')).id,
                ...values,
            };
            setFormdataset(newEvent);
            axios.patch(`http://127.0.0.1:5000/api/events/event/${id}/update`, newEvent, config)
                .catch(function (error) {
                    if (error.response) {
                        toast.error(error.response.data.responseBody.message)
                    }
                })
                .then(response => {
                    if(response.status === 200){
                        submitForm();
                    }
                })
        }
    };
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.currentTarget.name]: event.currentTarget.value,
        })


    }
    return (
        <NextUIProvider theme={darkTheme}>
            <Grid.Container gap={3} justify="center">
                <Grid sm={12} md={12} lg={6}>
                    <Card color="inherit">
                        <Card.Header>
                            <Text h1 color="warning">Atnaujinti renginį</Text>
                        </Card.Header>
                        <Divider />
                        <form>
                            <Card.Body css={{ py: "$15" }}>


                                <Input clearable bordered color="success" status="success"
                                    labelPlaceholder="Renginio pavadinimas"
                                    type="text"
                                    name='eventName'
                                    id='eventTitle'
                                    value={values.eventTitle}
                                    onChange={handleChange} />
                                <Spacer y={2} />

                                <Input clearable bordered color="success" status="success"
                                    type="date"
                                    name='dateTime'
                                    id='eventDate'
                                    value={values.eventDate}
                                    onChange={handleChange} required />
                                <Spacer y={2} />
                               

                                <Input clearable bordered color="success" status="success"
                                    type="text" name='eventTime' id='eventTime' labelPlaceholder="Renginio laikas hh:mm"
                                    value={values.eventTime}
                                    onChange={handleChange} />
                                <Spacer y={2} />

                                <Textarea clearable bordered
                                    type="text"
                                    name='eventDescription'
                                    id='eventDesc'
                                    color="success"
                                    status="success"
                                    labelPlaceholder="Renginio aprašymas"
                                    value={values.eventDesc}
                                    onChange={handleChange} />
                                <Spacer y={2} />
                                

                                <Text color="success"> Renginio nuotrauka:</Text>
                                <Input clearable bordered
                                    status="success"
                                    type="file"
                                    name='eventPhoto'
                                    id='eventPhoto'

                                  
                                    onChange={event => setImage(event.currentTarget.files[0])} />

                            </Card.Body>

                            <Divider />
                            <Card.Footer>
                                <Row justify="flex-end">
                                    <Button flat auto rounded onClick={(e) => navigate(`/MyEvents`)} size="sm" color="error">
                                        Grįžti atgal
                                    </Button>
                                    <Button flat auto rounded type="button" color="success" size="sm" onClick={handleRegistrationSubmit}>Atnaujinti renginį</Button>
                                </Row>
                            </Card.Footer>
                        </form>
                    </Card>
                </Grid>
            </Grid.Container>
        </NextUIProvider>
    )
}

export default CreateEventForm