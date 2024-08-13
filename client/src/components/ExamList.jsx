// components/ExamList.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ExamList() {
    const [exams, setExams] = useState([]);

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/exams');
                setExams(response.data);
            } catch (error) {
                console.error('Error fetching exams:', error);
            }
        };

        fetchExams();
    }, []);

    return (
        <div>
            <h1>Available Exams</h1>
            <ul>
                {exams.map(exam => (
                    <li key={exam._id}>
                        <Link to={`/exam/${exam._id}`}>{exam.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
