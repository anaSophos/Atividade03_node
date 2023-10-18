const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
    },
    anual_tax:{
        type: Number,
        required: true,
    },
    max_install:{
        type: Number,
        required: true,
    },

})

const Bank = mongoose.model('Bank', bankSchema)

module.exports = Bank