const mongoose = require('mongoose');
const { Schema } = mongoose;

const attemptSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    examTitle: {
        type: String,
        required: true
    },
    answers: [{
        questionId: {
            type: Schema.Types.ObjectId,
            ref: 'Exam.Question',
            required: true
        },
        selectedOption: {
            type: String,
            required: true
        }
    }],
    score: {
        type: Number,
        required: true
    }
});

const Attempt = mongoose.model('Attempt', attemptSchema);
module.exports = Attempt;
