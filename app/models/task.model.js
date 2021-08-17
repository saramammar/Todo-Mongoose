const mongoose = require('mongoose')

const Data = mongoose.model('Tasks', {
    title:{
        type:String,
        required: true,
        trim:true
    },
    content:{
        type:String,
        required: true,
        trim:true
    },
    dueDate: {
        type: Date,
        validate(value){
            if(value < new Date()) throw new Error('Old date is not allowed')
        }
    }
})

module.exports = Data