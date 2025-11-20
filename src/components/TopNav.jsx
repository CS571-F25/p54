import { Link, useLocation } from "react-router";

export default function TopNav() {
    const location = useLocation();

    // Gradient style: ONLY for Active Links now
    const gradientStyle = {
        background: "linear-gradient(135deg, #00f260 0%, #0575e6 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        color: "transparent",
        fontWeight: "800"
    };

    // Standard Silver for inactive links
    const inactiveStyle = {
        color: "#b0b0b0",
        fontWeight: "500",
        transition: "color 0.2s"
    };

    return (
        <nav className="navbar navbar-expand-lg shadow-sm" style={{ backgroundColor: '#1e1e1e', borderBottom: '1px solid #252525' }}>
            <div className="container-fluid px-4">
                <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
                    <span className="fs-4">✈️</span>

                    {/* FIX 1: Removed gradientStyle, added text-white */}
                    <span className="fs-4 tracking-wide text-white fw-bold">
                        ITINERARY BUILDER
                    </span>
                </Link>

                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    {/* Invert filter makes the black svg icon white */}
                    <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
                        {['/', '/itinerary', '/past-destinations', '/about'].map((path) => (
                            <li className="nav-item" key={path}>
                                <Link
                                    className="nav-link px-2"
                                    to={path}
                                    // Apply gradient ONLY if the path matches
                                    style={location.pathname === path ? gradientStyle : inactiveStyle}
                                >
                                    {path === '/' ? 'Planner' :
                                        path === '/itinerary' ? 'Itinerary' :
                                            path === '/past-destinations' ? 'Past Trips' : 'About'}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}