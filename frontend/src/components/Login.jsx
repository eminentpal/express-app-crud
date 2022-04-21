import React, { useState } from 'react'
import girl from '../images/girl.png'
import {Form,Button, Container, Row, Col} from 'react-bootstrap'
import {useHistory} from "react-router-dom"




function Login() {

    const history = useHistory();

   

    const [email,setEmail] = useState('')
    const [pass,setPass] = useState('')
    const [emailError ,setEmailError] = useState(false)
    const [passError,setPassError] = useState(false)

    const handleSubmit = (e) =>{
         e.preventDefault();

         setEmailError(false)
         setPassError(false)
         if(email === ''){
             setEmailError(true)
         }
         if(pass === ''){
             setPassError(true)
         }

         if (email === "admin@gmail.com" && pass=== "123") {
            history.push('/home')
         }
    }

    return (
        <Container>
          
            <Row className='mt-5'>
                <Col md={6} sm={6}>
                  <img  className="img-girl"
                  src={girl}
                  alt="girl-pic" />
                </Col>
                <Col md={6} sm={6} className="mt-5">
                <h1 className="text-center">Login</h1>
           <Form  onSubmit={handleSubmit} className="mt-5">
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>

    <Form.Control 
    type="email" 
    placeholder="Enter email"
    onChange={(e) => setEmail(e.target.value)}
    danger={emailError} />
    
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control 
    type="password" 
    placeholder="Password" 
    onChange={(e) => setPass(e.target.value)}
    variant={passError}/>
  </Form.Group>
  
 
  <Button  type="submit"
   className='button'
   variant="outlined-danger"
  onClick={handleSubmit}>
    Login
  </Button>
</Form> 
                </Col>
            </Row>
        </Container>
    )
}

export default Login
