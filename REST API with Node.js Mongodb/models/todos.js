const mongoose = require('mongoose');
const TodosSchema = mongoose.Schema({
    userId : {type: Number, required: true},
    id : {type: Number, required: true},
    title : {type: String, required: true} ,
    completed : {type: Boolean, required: true}
})
module.exports = mongoose.model('Todos',TodosSchema);