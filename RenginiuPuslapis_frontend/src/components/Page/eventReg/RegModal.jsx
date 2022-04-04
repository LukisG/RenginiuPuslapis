import React, { useState } from 'react'
import "./modal.css"
import axios from 'axios';
import toast from 'react-hot-toast';
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react"

function RegModal({ closeModal, eventid, openModal }) {
    const [userdata, setUserdata] = useState({});
    const onChange = (e) => {
        // console.log(e.target.value, e.target.name)
        setUserdata((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,

        }))
    }
    const addparticipant = async () => {
        const REG_URL = `http://127.0.0.1:5000/api/events/event/:${eventid}/participant/`
        const response = await axios.post(REG_URL, userdata).catch(function (error) {
            if (error.response) {

                toast.error(error.response.data.responseBody.message)
            }

        });
        if (response.status === 200) {
            toast.success("succesfully registered!");

            setTimeout(closeModal, 1000);
        }
    }
    return (
        <div className='modalBackground'>
            <Modal
               
                closeButton
                aria-labelledby="modal-title"
                open={openModal}
                onClose={closeModal}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        Užsiregistruoti į renginį

                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        name='name'
                        placeholder="Name"

                    />
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        type="email"
                        name='email'
                        placeholder="Email"
                        onChange={e => onChange(e)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color='success' onClick={() => addparticipant()}>
                        Registruotis
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default RegModal