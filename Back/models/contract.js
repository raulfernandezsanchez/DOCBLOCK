const mongoose = require ('mongoose');
const yup = require('yup');




const ContractSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },

    startDate:{
        type: Date,
    },

    endDate:{
        type: Date,
        default: '2099-10-27T15:30:00.119Z'
    },
    contractPDF:{
        type: String,
        
    }
});

module.exports = mongoose.model('Contract',ContractSchema);