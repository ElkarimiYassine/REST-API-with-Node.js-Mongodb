const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const TodosRoutes =require('./API/routes/Todos');

mongoose.connect('mongodb+srv://ysnkrm:ysnkrm@cluster0.zzfhooq.mongodb.net/?retryWrites=true&w=majority', {
   useNewUrlParser: true,
   useUnifiedTopology: true
});
mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://ysnkrm:ysnkrm@cluster0.zzfhooq.mongodb.net/?retryWrites=true&w=majority', () => {
  console.log("Connected to MongoDB");
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',
               'Origin, -Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
app.use(bodyParser.json())
app.use('/Todos',TodosRoutes);
app.use((req,res,next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
     error: {
            message: error.message
        }
    });
});

module.exports = app;
