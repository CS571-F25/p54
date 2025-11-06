import { Link } from 'react-router'

export default function AboutMe(props) {
    return <div>
        <h1>About Us</h1>
        <Link to="/">
            <button style={{ padding: '10px 20px', cursor: 'pointer' }}>
                Back
            </button>
        </Link>
    </div>
}