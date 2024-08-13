// components/ExamPage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ExamPage() {
    const { id } = useParams();
    const [exam, setExam] = useState(null);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const response = await axios.get(`http://localhost:5002/api/exam/${id}`);
                setExam(response.data);
            } catch (error) {
                console.error('Error fetching exam:', error);
            }
        };

        fetchExam();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5002/api/exam/${id}/submit`, { answers });
            setScore(response.data);
        } catch (error) {
            console.error('Error submitting answers:', error);
        }
    };

    if (!exam) return <div>Loading...</div>;

    return (
        <div>
            <h1>{exam.title}</h1>
            <form onSubmit={handleSubmit}>
                {exam.questions.map((q, index) => (
                    <div key={index}>
                        <p>{q.question}</p>
                        {q.options.map((option, i) => (
                            <div key={i}>
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value={option}
                                    onChange={(e) => setAnswers({ ...answers, [index]: e.target.value })}
                                />
                                {option}
                            </div>
                        ))}
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
            {score && (
                <div>
                    <h2>Score: {score.score} / {score.total}</h2>
                </div>
            )}
        </div>
    );
}
