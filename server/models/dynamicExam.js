const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        validate: [arrayLimit, 'Options must be an array of 4 strings'],
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    }
});

function arrayLimit(val) {
    return val.length === 4;
}

const createDynamicModel = (examTitle) => {
    const dynamicSchema = new Schema({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        questions: [questionSchema]
    });

    return mongoose.model(examTitle, dynamicSchema);
};

module.exports = createDynamicModel;
