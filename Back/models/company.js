const mongoose = require ('mongoose');
const yup = require('yup');
const bcrypt = require('bcrypt')



const CompanySchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        minlength: 10,
        maxlength: 200
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
        maxlength: 24
    },
    name:{
        type: String,
        required: true,
        minlength:3,
        maxlength:40
    },
    address:{
        type: String,
        minlength:3
    },
    Contractsuploaded:{
        type: [String]
    }
   
});

const validateCompany = company =>{
    const schema = yup.object().shape({
        companyemail:yup.string().required().min(10).max(200),
        companypassword:yup.string().required().min(8).max(24),
        companyname:yup.string().required().min(3).max(40),
        companyaddress:yup.string().min(3),
    });

    return schema  
        .validate(company)
        .then((company) => company)
        .catch((error) => {
            return{
                message:error.message
            }
        });
}

CompanySchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password,salt)
        this.password = hashedPassword
        next()
    } catch (error) {
        next(error)
    }
})



exports.Company = new mongoose.model('Company',CompanySchema);
exports.validateCompany = validateCompany;