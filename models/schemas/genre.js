const mongoose = require('mongoose');

const Genre = mongoose.model('Genre',new mongoose.Schema({
    name:{
        type: String,
        require: true,
        minlength: 3,
        maxlength: 50
    }
}));

exports.Genre = Genre;