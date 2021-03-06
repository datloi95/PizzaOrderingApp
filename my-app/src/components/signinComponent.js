import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import { UserContext } from "../App";
import jwt_decode  from 'jwt-decode'
import axios from 'axios';

const SignIn = () => {
    const [show, setShow] = useState(false);

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const { state, dispatch } = useContext(UserContext);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const signIn = async () => {
        const result = await axios.post(
            'http://localhost:5000/api/auth/login', {username, password}
          );
        
        const token = result.data.data;
        const decoded = jwt_decode(token);

        dispatch({
            type: "LOGIN",
            payload: { token, username: decoded.unique_name }   
        })
    };

    const handleSubmit = () => {
        setShow(false);
        signIn();
    }
    
  
    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Sign In
            </Button>
    
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>User Sign In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter user name" onChange={(e) => setUserName(e.target.value)} />
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

export default SignIn;