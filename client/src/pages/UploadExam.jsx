import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function UploadExam() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        questions: [{ question: '', options: ['', '', '', ''], correctAnswer: '' }]
    });

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...formData.questions];
        newQuestions[index][field] = value;
        setFormData({ ...formData, questions: newQuestions });
    };

    const addQuestion = () => {
        setFormData({
            ...formData,
            questions: [...formData.questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5002/exam/upload', formData);
            toast.success('Exam uploaded successfully');
            setFormData({ title: '', description: '', questions: [{ question: '', options: ['', '', '', ''], correctAnswer: '' }] });
        } catch (error) {
            toast.error('Failed to upload exam');
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />
                <label>Description</label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
                {formData.questions.map((q, index) => (
                    <div key={index}>
                        <label>Question {index + 1}</label>
                        <input
                            type="text"
                            value={q.question}
                            onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                            required
                        />
                        <label>Options</label>
                        {q.options.map((opt, optIndex) => (
                            <input
                                key={optIndex}
                                type="text"
                                value={opt}
                                onChange={(e) => {
                                    const newOptions = [...q.options];
                                    newOptions[optIndex] = e.target.value;
                                    handleQuestionChange(index, 'options', newOptions);
                                }}
                                required
                            />
                        ))}
                        <label>Correct Answer</label>
                        <input
                            type="text"
                            value={q.correctAnswer}
                            onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={addQuestion}>Add Question</button>
                <button type="submit">Upload Exam</button>
            </form>
        </div>
    );
}
