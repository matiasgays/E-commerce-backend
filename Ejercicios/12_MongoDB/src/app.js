const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const { userRouter } = require('./routes/userRouter');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT;
const httpServer = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PSW}@cluster0.kpm0q.mongodb.net/ecommerce?retryWrites=true&w=majority`, error => {
    if (error) {
        console.log('Cannot connect to database: '+error);
        process.exit;
    }
    else console.log('Connected to database');
})

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use('/api/users', userRouter);