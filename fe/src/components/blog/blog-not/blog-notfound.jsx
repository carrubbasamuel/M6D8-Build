import { Button, Col, Container, Row } from "react-bootstrap";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import animation from "./animationLottie.json";


export default function BlogNotFound() {

    const lottieOptions = {
        loop: true, // Se l'animazione deve riprodursi in loop o meno
        autoplay: true, // Se l'animazione deve partire automaticamente quando il componente si monta
        animationData: animation, // L'oggetto JSON dell'animazione
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice" // Modalità di ridimensionamento dell'animazione
        }
      };

    return(
        <Container>
            <Row>
                <Col>
                    <Lottie options={lottieOptions} height={400} width={400} />
                </Col>
                <Col className="d-flex flex-column align-items-center justify-content-center">
                    <h1>Ops...</h1>
                    <h2>You don't post anything!</h2>
                    <span>Click the button below to add new post !</span>
                    <Button as={Link} to="/new" variant="success" className="mt-3">Add new post</Button>
                </Col>
            </Row>
        </Container>
    )

}