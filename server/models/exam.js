// models/exam.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for individual questions
const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        validate: {
            validator: function(v) {
                return v.length === 4; // Validate that there are exactly 4 options
            },
            message: 'Options must be an array of exactly 4 strings'
        },
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    }
});

// Define the schema for the exam
const examSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    questions: [questionSchema] // Array of questions
});

// Create the model for the exam schema
const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
