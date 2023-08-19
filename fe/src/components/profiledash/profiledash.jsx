import React from 'react';
import { Col, Container, Dropdown, Row } from 'react-bootstrap';
import { BsGear } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import AvatarImg from '../avatarimg/avatarimg';
import ModalDelete from './ModalDelete';
import './profiledash.css';

const ProfileDash = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const { user } = useSelector((state) => state.login.userLogged);

    

    return (
        <div style={{ margin: '80px 0' }}>
            <Container className='desc'>
                <Row className='align-items-center'>
                    <Col className='text-center '>
                        <AvatarImg />
                    </Col>
                    <Col className='d-flex'>
                        <div>
                            <h1>
                                {user?.surname} {user?.name}
                            </h1>
                            <h3>{user?.email}</h3>

                        </div>
                        <div className="ms-5 fs-3">

                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                                    <BsGear className='gearani' />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1" onClick={() => setModalShow(true)}>Delete your account</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            
                        </div>

                    </Col>
                </Row>
            </Container>
            <ModalDelete show={modalShow} onHide={() => setModalShow(false)} />
        </div>
    );
};

export default ProfileDash;
