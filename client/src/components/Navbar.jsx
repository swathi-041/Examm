import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/upload-exam">Upload Exam</Link>
            <Link to="/exams">Exams</Link>
        </nav>
    );
}
