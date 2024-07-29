const mongoose = require('mongoose');

const thesisSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { 
        type: String, 
        required: true, 
    },
    description: String,
    prerequisites: String, // prerequisites for the thesis, Ex: DBMS course if you wanna do a thesis in Web Development
    tags: [String],
    created_time: Date,    
    file: [{type: mongoose.Schema.Types.ObjectId, ref:'FileThesis'}],
    assigned: Boolean, // true if it is assigned to some student
    university: { type: mongoose.Schema.Types.ObjectId, ref: 'University'},
    professor: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
    pending: Boolean, // external,student wait for approval from professor. 
    creator_student: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
    creator_external:{ type: mongoose.Schema.Types.ObjectId, ref:'External'},
    images: String, // to store path image 
    });

    
module.exports = mongoose.model('Thesis', thesisSchema,'thesis');