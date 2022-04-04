import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./../../style.css";
import validation from './validation'
import toast from 'react-hot-toast';
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

const CreateEventForm = ({ submitForm, setFormdataset }) => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        eventTitle: "",
        eventDate: "",
        eventTime: "",
        eventDesc: "",
    })
    const [image, setImage] = useState("")
    const [errors, setErrors] = useState({})
    const formData = new FormData()

    const handleRegistrationSubmit = (event) => {
        formData.append('file', image);
        formData.append('upload_preset', 'vw7xzkyq');
        setErrors(validation(values))
        const imguploadURL = ''; //image upload url here
        if (image && values.eventTitle && values.eventDate && values.eventTime && values.eventDesc) {
            axios.post(imguploadURL, formData)
                .then((response) => {
                    event.preventDefault()
                    const config = {
                        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
                    };
                    const newEvent = {
                        user: JSON.parse(localStorage.getItem('user')).id,
                        eventName: values.eventTitle,
                        dateTime: values.eventDate + " " + values.eventTime + "Z",
                        eventDescription: values.eventDesc,
                        eventPhoto: response.data.secure_url,
                    };
                    setFormdataset(newEvent);
                    axios.post("http://localhost:5000/api/events/event", newEvent, config)
                        .then(() => submitForm())
                        .catch(function (error) {
                            if (error.response) {
                                toast.error(error.response.data.responseBody.message)
                            }
                        });
                }).catch(function (error) {
                    if (error.response.status === 400) {
                        toast.error("Ikelkite nuotrauka!")
                    }
                });
        } else {
            toast.error("Please select an image")
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
                            <Text h1 css={{
                                textGradient: "45deg, $yellow500 -20%, $red500 100%",
                            }}>Sukurti renginį</Text>
                        </Card.Header>
                        <Divider />
                        <form>
                            <Card.Body css={{ py: "$15" }}>


                                <Input clearable bordered color="success" status="success"
                                    labelPlaceholder="Pavadimas"
                                    type="text"
                                    name='eventTitle'
                                    id='eventTitle'
                                    value={values.eventTitle}
                                    onChange={handleChange} />
                                <Spacer y={2} />

                                <Input clearable bordered color="success" status="success"
                                    type="date"
                                    name='eventDate'
                                    id='eventDate'
                                    value={values.eventDate}
                                    onChange={handleChange} required />
                                <Spacer y={2} />
                                {errors.eventTime && <p>{errors.eventTime}</p>}

                                <Input clearable bordered color="success" status="success"
                                    type="text" name='eventTime' id='eventTime' labelPlaceholder="Renginio laikas hh:mm"
                                    value={values.eventTime}
                                    onChange={handleChange} />
                                <Spacer y={2} />

                                {errors.eventDesc && <p>{errors.eventDesc}</p>}
                                <Textarea clearable bordered
                                    type="text"
                                    name='eventDesc'
                                    id='eventDesc'
                                    color="success"
                                    status="success"
                                    labelPlaceholder="Renginio aprašymas"
                                    value={values.eventDesc}
                                    onChange={handleChange} />
                                <Spacer y={2} />
                                {errors.eventPhoto && <Text>{errors.eventPhoto}</Text>}

                                <Text color="success"> Renginio nuotrauka:</Text>
                                <Input clearable bordered

                                    status="success"
                                    type="file"
                                    name='eventPhoto'
                                    id='eventPhoto'
                                    css={{ height: "100px" }}
                                    value={values.eventPhoto}
                                    onChange={event => setImage(event.currentTarget.files[0])} />

                            </Card.Body>

                            <Divider />
                            <Card.Footer>
                                <Row justify="flex-end">
                                    <Button flat auto rounded onClick={(e) => navigate(`/`)} size="sm" color="error">
                                        Grįžti atgal
                                    </Button>
                                    <Button flat auto rounded type="button" color="success" size="sm" onClick={handleRegistrationSubmit}>Sukurti renginį</Button>
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