import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function TopNav() {
    const location = useLocation();

    return (
        <Navbar expand="lg" className="shadow-sm" style={{ backgroundColor: '#1e1e1e', borderBottom: '1px solid #252525' }}>
            <Container fluid className="px-4">
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
                    <span className="fs-4">✈️</span>
                    <span className="fs-4 tracking-wide text-white fw-bold">
                        ITINERARY BUILDER
                    </span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-nav" />
                <Navbar.Collapse id="main-nav">
                    <Nav className="ms-auto gap-3">
                        {['/', '/itinerary', '/past-destinations', '/about'].map((path) => {
                            const isActive = location.pathname === path;
                            let label = '';
                            if (path === '/') label = 'Planner';
                            else if (path === '/itinerary') label = 'Itinerary';
                            else if (path === '/past-destinations') label = 'My Trips';
                            else label = 'About';

                            return (
                                <Nav.Link
                                    key={path}
                                    as={Link}
                                    to={path}
                                    className="px-2 fw-semibold"
                                    style={isActive ? {
                                        background: "linear-gradient(135deg, #00f260 0%, #0575e6 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                        color: "transparent"
                                    } : { color: "#b0b0b0" }}
                                >
                                    {label}
                                </Nav.Link>
                            );
                        })}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}