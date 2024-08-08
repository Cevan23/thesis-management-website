const mongoose = require('mongoose');
 
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String, 
        required: true, 
        unique: true
        },
    password: { type: String, required: true },
    name: String,
    lastname: String,
    role: { 
            type: String,
            enum: ['Guest','Admin','Professor','Student','Secretariat']
    },
    university: { type: mongoose.Schema.Types.ObjectId, ref: 'University'},
    imageprofile: String,
    phone: String,
    });

module.exports = mongoose.model('User', userSchema);