
import { Button, Col, Container, Row } from "react-bootstrap"
import Lottie from "react-lottie"
import { Fade } from "react-reveal"
import { Link } from "react-router-dom"
import animation from "./notsave.json"


export default function BlogNotSaved() {

    const lottieOptions = {
        loop: true, // Se l'animazione deve riprodursi in loop o meno
        autoplay: true, // Se l'animazione deve partire automaticamente quando il componente si monta
        animationData: animation, // L'oggetto JSON dell'animazione
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice" // Modalità di ridimensionamento dell'animazione
        }
    };

    return (
        <Container >
            <Row className="justify-content-center">
            <Col  className="p-0">
                    <Fade left duration={900}>
                        <Lottie options={lottieOptions} width={300} />
                    </Fade>
                </Col>
                <Col className="d-flex flex-column align-items-center justify-content-center mb-3">
                    <Fade right duration={900}>
                        <h1 className="display-3 text-center">You have no saved posts!</h1>
                        <p className="display-6 text-center"><span className="text-success">Explore our blog </span>and save your favourite posts!</p>
                        <Button variant="success" className="mt-5" as={Link} to="/">Explore our blog!</Button>
                    </Fade>
                </Col>
            </Row>
        </Container>
    )

} 