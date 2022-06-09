const mongoose = require ('mongoose');
const yup = require('yup');
const bcrypt = require('bcrypt')


const UserSchema = new mongoose.Schema({
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
    assignedContracts:{
        type: [String]
    }
   
});

const validateUser = user =>{
    const schema = yup.object().shape({
        useremail:yup.string().required().min(10).max(200),
        userpassword:yup.string().required().min(8).max(24),
        username:yup.string().required().min(3).max(40)
    })
    return schema  
        .validate(user)
        .then((user) => user)
        .catch((error) => {
            return{
                message:error
            }
        });
    }
        


UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password,salt)
        this.password = hashedPassword
        next()
    } catch (error) {
        next(error)
    }
})
 




exports.User = new mongoose.model('User',UserSchema);
exports.validateUser = validateUser;