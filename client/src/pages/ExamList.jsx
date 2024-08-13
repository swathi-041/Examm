import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ExamList() {
    const [exams, setExams] = useState([]);

    useEffect(() => {
        async function fetchExams() {
            try {
                const response = await axios.get('http://localhost:5002/api/exams');
                setExams(response.data);
            } catch (err) {
                console.error('Error fetching exams:', err);
            }
        }

        fetchExams();
    }, []);

    return (
        <div>
            <h1>Available Exams</h1>
            <ul>
                {exams.map((exam) => (
                    <li key={exam._id}>
                        <Link to={`/exam/${exam.title}`}>{exam.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
