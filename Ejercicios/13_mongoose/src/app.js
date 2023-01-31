import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import studentRouter from './routes/studentRouter.js';
import studentModel from './models/studentModel.js'

const app = express();

dotenv.config();
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PSW}@cluster0.kpm0q.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, error => {
    if (error) {
        console.log('Cannot connect to database: '+error);
        process.exit;
    }
    else console.log('Connected to database')
    // let result = loadStudents();
})

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use('/api/students', studentRouter);

const loadStudents = async () => {
    try {
        const result = await studentModel.insertMany([
            {
                "name": "mello",
                "lastName": "gays",
                "course": "math",
                "age": 29,
                "ID": "ing.matiasgays@gmail.com",
                "grade": 8
            },
            {
                "name": "matias",
                "lastName": "juares",
                "course": "science",
                "age": 25,
                "ID": "matiasj@gmail.com",
                "grade": 7
            },
            {
                "name": "maria",
                "lastName": "sanchez",
                "course": "math",
                "age": 23,
                "ID": "marias@gmail.com",
                "grade": 8
            },
            {
                "name": "luisina",
                "lastName": "daniba",
                "course": "programming",
                "age": 30,
                "ID": "luisinad@gmail.com",
                "grade": 9.5
            },
            {
                "name": "andrea",
                "lastName": "paredes",
                "course": "programming",
                "age": 29,
                "ID": "andresp@gmail.com",
                "grade": 8.5
            }      
        ])
        return result;
    } catch (err) {
        throw new Error(err);
    }
}