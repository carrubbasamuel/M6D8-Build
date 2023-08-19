import { Col, Container, Row } from "react-bootstrap";
import Lottie from "react-lottie";
import { Fade } from "react-reveal";
import animation from "./animationLottie.json";
import "./header.css";


export default function Header({name}) {

    const lottieOptions = { 
        loop: true, // Se l'animazione deve riprodursi in loop o meno
        autoplay: true, // Se l'animazione deve partire automaticamente quando il componente si monta
        animationData: animation, // L'oggetto JSON dell'animazione
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice" // Modalità di ridimensionamento dell'animazione
        }
    };

    return (
        <Container id="header" className="mt-5 mb-5">
            <Row className="flex-column flex-md-row">
            <Col className="d-flex flex-column align-items-center justify-content-center blog-main-title mb-3">
                    <Fade top duration={900}>
                    <h1 className="display-1 text-center text-md-end ">Walcome on Strive {name}!</h1>
                    <p className="fs-4 text-center text-md-end"><span className="text-success">Explore our blog </span>A World of Discoveries and Inspiration!</p>
                    </Fade>
                </Col>
            <Col >
                <Fade top duration={900}>
                    <Lottie id="LottiHeader" options={lottieOptions}  />
                </Fade>
                </Col>
            </Row>
        </Container>
    )

}