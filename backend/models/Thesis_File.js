const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    file_data_path: String, // to store pdf,word file   
    file_name: String, // pdf,word name file
    created_time : Date,
    thesis: {type: mongoose.Schema.Types.ObjectId, ref:'Thesis'},

})

module.exports = mongoose.model('FileThesis', fileSchema,'file_thesis');