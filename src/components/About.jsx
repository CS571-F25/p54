import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import TopNav from './TopNav'

export default function AboutMe() {

    // Reuse the gradient style
    const gradientStyle = {
        background: "linear-gradient(135deg, #00f260 0%, #0575e6 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        color: "transparent",
        fontWeight: "800"
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <TopNav />

            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <Card className="shadow-lg p-5">
                            <Card.Body className="text-center">
                                <h1 className="mb-4 display-4" style={gradientStyle}>
                                    About Us
                                </h1>

                                <p className="lead mb-4 text-white">
                                    We make travel planning easier than ever.
                                </p>

                                <p className="mb-5" style={{ color: '#b0b0b0', fontSize: '1.1rem', lineHeight: '1.8' }}>
                                    Our interactive planner allows you to explore Europe and easily pick your favorite destinations,
                                    allowing you to build an interactive, professional itenerary with the click of a button.
                                </p>

                                <Button
                                    as={Link}
                                    to="/"
                                    className="rounded-pill px-5 py-2 text-white fw-bold btn-gradient"
                                    style={{ boxShadow: "0 4px 15px rgba(0, 242, 96, 0.2)" }}
                                >
                                    Start Planning
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
