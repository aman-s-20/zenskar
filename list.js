const mongoose  = require('mongoose');

const listSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    date: {
        type: Date
    },
    category:{
        type : String
    }

    
})

const ListModel = new mongoose.model('list',listSchema);
module.exports = {ListModel};