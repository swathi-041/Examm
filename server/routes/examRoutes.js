const express = require('express');
const router = express.Router();
const createDynamicModel = require('../models/dynamicExam');
const Exam = require('../models/exam');
const { getExams, getExamById, submitAnswers } = require('../controllers/examController');

// Route to upload a new exam
router.post('/upload', async (req, res) => {
    try {
        const { title, description, questions } = req.body;

        if (!title || !questions || questions.length === 0) {
            return res.status(400).json({ message: 'Title and questions are required' });
        }

        const DynamicExam = createDynamicModel(title);
        const exam = new DynamicExam({ title, description, questions });
        await exam.save();

        res.status(201).json({ success: true, message: 'Exam uploaded successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to upload exam' });
    }
});

// Route to get all available exams
router.get('/exams', async (req, res) => {
    try {
        const exams = await Exam.find({}, 'title');
        res.json(exams);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching exams' });
    }
});

// Route to get details of a specific exam by title
router.get('/exams/:title', async (req, res) => {
    try {
        const exam = await Exam.findOne({ title: req.params.title });
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.json(exam);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching exam details' });
    }
});

// Route to get a specific exam by ID (if using dynamic models)
router.get('/exam/:id', getExamById);

// Route to submit answers and evaluate the score
router.post('/exam/:id/submit', submitAnswers);

module.exports = router;
