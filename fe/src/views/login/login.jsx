import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { BsGithub } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { MdDangerous } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../../assets/logo.png';
import { fetchLogin, setCodeRegister } from '../../redux/reducers/LoginSlice';


import './login.css';

export default function Login() {
  const [notexist, setNotexist] = useState(false);
  const { codeRegister } = useSelector((state) => state.login);
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mail = useRef(null);
  const password = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    localStorage.removeItem('users');
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(setCodeRegister(null));
      const user = {
        email: mail.current.value,
        password: password.current.value
      };
      dispatch(fetchLogin(user)).then((res) => {
        const { statusCode } = res.payload;
        if (statusCode === 200) {
          navigate('/');
        } else {
          setNotexist(true);
          setTimeout(() => {
            setNotexist(false);
          }, 5000);
        }
      });
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="login-root">
      <Container>
        <Row className="justify-content-center align-items-center vh-100">
          <Col md={6}>
            <div className="login-form">
              <img className='mb-5' width={150} src={logo} alt="" />
              <Row className='align-items-center'>
                <Col>
                  <Form onSubmit={handleSubmit} >
                    {codeRegister?.statusCode === 409 && <Alert variant="danger" className='alertlogin'><MdDangerous className='me-2' />    You have al ready an account whit this email!</Alert>}
                    {notexist && <Alert variant="danger" className='alertlogin'><MdDangerous className='me-2' />      Email or Password not correct</Alert>}
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control ref={mail} type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control ref={password} type="password" placeholder="Enter password" />
                    </Form.Group>
                    <Button className='m-4' variant="outline-success" type="submit">
                      Login
                    </Button>
                    <Link className='text-muted' to="/register">SingUp</Link>
                  </Form>
                </Col>
                
                  <h5 className='text-center'>OR</h5>
                <Col>
                  <button onClick={() => window.location.href = process.env.REACT_APP_API_URL + '/auth/google'} className='googlebutton'><FcGoogle className='me-3 fs-3' /> SingIn with Google</button>
                  {/* <button onClick={() => window.location.href = process.env.REACT_APP_API_URL + '/auth/facebook/callback'} className='facebookbutton'><FaFacebook className='me-3 fs-3' /> SingIn with Facebook</button> */}
                  <button onClick={() => window.location.href = process.env.REACT_APP_API_URL + '/auth/github/callback'} className='githubbutton'><BsGithub className='me-3 fs-3' /> SingIn with GitHub</button>
                </Col>
              </Row>



            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
