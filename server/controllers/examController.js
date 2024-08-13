const mongoose = require('mongoose');
const Exam = require('../models/exam'); // Static model for getting the list of exams

// Function to get all available exams
const getExams = async (req, res) => {
    try {
        const exams = await Exam.find({}, 'title');
        res.json(exams);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching exams' });
    }
};

// Function to get a specific exam by ID
const getExamById = async (req, res) => {
    try {
        // Create a dynamic model based on the exam title or ID
        // Here I'm assuming the ID is the unique identifier for the exam
        const exam = await Exam.findById(req.params.id);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.json(exam);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching exam details' });
    }
};

// Function to submit answers and evaluate the score
const submitAnswers = async (req, res) => {
    try {
        // Create a dynamic model based on the exam ID
        // Here I'm assuming the ID is the unique identifier for the exam
        const exam = await Exam.findById(req.params.id);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        const { answers } = req.body; // Assuming answers are submitted in the request body
        if (!answers || !Array.isArray(answers) || answers.length !== exam.questions.length) {
            return res.status(400).json({ message: 'Invalid answers submitted' });
        }

        let score = 0;
        exam.questions.forEach((question, index) => {
            if (question.correctAnswer === answers[index]) {
                score++;
            }
        });

        res.json({ score, totalQuestions: exam.questions.length });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error evaluating answers' });
    }
};

module.exports = {
    getExams,
    getExamById,
    submitAnswers
};
