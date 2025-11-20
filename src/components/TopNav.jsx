import { Link } from "react-router";

export default function TopNav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">
            Travel Itinerary Builder
            </Link>

            <div className="collapse navbar-collapse show">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className="nav-link" to="/">
                    Home
                </Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/itinerary">
                    Itinerary
                </Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/past-destinations">
                    Past Destinations
                </Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/about">
                    About
                </Link>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    );
}
