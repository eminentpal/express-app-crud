import React, { useState, useEffect } from "react";
import girl from "../images/girl.png";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Login({ setAuthorised, authorised }) {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  console.log({ tr: authorised });

  useEffect(() => {
    if (authorised) {
      history.push("/home");
    }
  }, [authorised]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError(false);
    setPassError(false);
    if (email === "") {
      setEmailError(true);
    }
    if (pass === "") {
      setPassError(true);
    }

    //  if (email === "admin@gmail.com" && pass=== "123") {
    //     history.push('/home')
    //  }

    try {
      const { data } = await axios.post(`http://localhost:4000/auth/login`, {
        email,
        pass,
      });

      if (data) {
        localStorage.setItem("authorised", true);
        setAuthorised(true);
        history.push("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col md={6} sm={6}>
          <img className="img-girl" src={girl} alt="girl-pic" />
        </Col>
        <Col md={6} sm={6} className="mt-5">
          <h1 className="text-center">Login</h1>
          <Form onSubmit={handleSubmit} className="mt-5">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>

              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                danger={emailError}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPass(e.target.value)}
                variant={passError}
              />
            </Form.Group>

            <Button
              type="submit"
              className="button"
              variant="outlined-danger"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
