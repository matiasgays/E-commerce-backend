import mongoose from 'mongoose';

// const studentCollection = "students";

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    ID: {
        type: String,
        required: true,
        unique: true
    },
    course: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
})

const studentModel = mongoose.model("students", studentSchema);
export default studentModel;