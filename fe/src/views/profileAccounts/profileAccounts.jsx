import { useEffect } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BlogList from "../../components/blog/blog-list/BlogList";
import { fetchAnUser } from "../../redux/reducers/LoginSlice";
import { setChange } from "../../redux/reducers/PostSlice";

export default function ProfileAccounts(){
    const dispatch = useDispatch();
    const { id } = useParams();
    const  user = useSelector((state) => state.login.userSelected);
    const { userSelected } = user || {};
    const { change } = useSelector((state) => state.author);
   

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchAnUser(id));
    }, [id, dispatch]);

    useEffect(() => {
        if(change){
            dispatch(fetchAnUser(id));
        }
        return dispatch(setChange(false));
    }, [change, dispatch, id]);

    return(
        <Container>
            {userSelected && <>
            <Row style={{margin: '200px 0'}} className="justify-content-center align-items-center">
                <Col className="d-flex justify-content-center">
                    <Image src={userSelected.user.avatar} roundedCircle width={250} height={250} className='shadow imgdash' />
                </Col>
                <Col className="d-flex justify-content-center flex-column">
                    <h1>{userSelected.user.name}</h1>
                    <h3>{userSelected.user.email}</h3>
                </Col>
            </Row>

            <BlogList posts={userSelected.userPosts}/>
            </>
            }
        </Container>
    )
}