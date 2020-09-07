import React, { useState } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import axios from 'axios';

const SignUp = () => {
    const [show, setShow] = useState(false);

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const createUser = async () => {
        const result = await axios.post(
          'http://localhost:5000/api/auth/register', {username, password}
        );
    };

    const handleSubmit = () => {
        setShow(false);
        createUser();
    }
  
    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Sign Up
            </Button>
    
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>User Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" onChange={(e) => setUserName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
            </Modal>
        </div>
    );
}

export default SignUp;