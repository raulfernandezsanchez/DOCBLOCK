const express = require('express');
const { Company, validateCompany } = require('../models/company');
const Contract  = require('../models/contract');
const router = express.Router();
const {User,validateUser} = require('../models/user');
const multer = require('multer');

    const storage = multer.diskStorage({
        destination: function(req,file,cb){
            cb(null,'./uploads/')
        },
        filename: function(req,file,cb) {
            cb(null, Date.now() + file.originalname);
        }
    });



const upload = multer({storage: storage});

//USERS METHODS

//POST: CREATE A NEW USER

router.post('/users',async (req,res) => {
    const error = await validateUser(req.body);
    if(error.useremail){
        let user = new User({
            email:req.body.useremail,
            password:req.body.userpassword,
            name:req.body.username,
            address:req.body.useraddress,
        });
        const email = user.email
        const name = user.name
        const emailexists = await User.findOne({email:email})
        const nameexists = await User.findOne({name:name})
        if(! emailexists || ! nameexists){
            const saveduser = await user.save()
            res.send(saveduser)
        }else{
            res.status(400).send('This user already exists')
        }   
    }else{
        res.status(400).send(error.message)
    }
});

//PUT: UPDATE USER

router.put("/users/:userId", async (req,res) => {
    
    const updatedUser = await User.findByIdAndUpdate(req.params.userId,
    {   
        $push: {assignedContracts: req.body.userassignedContracts},
        email:req.body.useremail,
        password:req.body.userpassword,
        name:req.body.username,
        address:req.body.useraddress,
    });
    if (!updatedUser) res.status(404).send("user not found");
    res.send(updatedUser);
});

router.put("/users/:userId/deletecontract", async (req,res) => {
    
    const updatedUser = await User.findByIdAndUpdate(req.params.userId,
    {   
        $pull: {assignedContracts: req.body.userassignedContracts},
    });
    if (!updatedUser) res.status(404).send("user not found");
    res.send(updatedUser);
});


//GET ALL USERS

router.get("/users", (req,res) => {
    User.find()
        .then((users) => res.send(users))
        .catch((error) => {
            return res.status(500).send(error.message);
        });
});

//GET A USER BY EMAIL

router.get("/users/:email", async (req,res) => {
    const email = req.params.email
    try {
        const doc = await User.findOne({ email: email })
        if (!doc) {
          throw new Error('no document found')
        }
        res.json({ user: doc })
      } catch {
        res.status(404).send('There is no user for such email')
      }
});






//COMPANY METHODS

//GET ALL COMPANIES

router.get("/companies", (req,res) => {
    Company.find()
        .then((companies) => res.send(companies))
        .catch((error) => {
            return res.status(500).send(error.message);
        });
});

//GET A COMPANY BY EMAIL

router.get("/companies/:email", async (req,res) => {
    const email = req.params.email
    try {
        const doc = await Company.findOne({ email: email })
        if (!doc) {
          throw new Error('no document found')
        }
        res.json({ company: doc })
      } catch {
        res.status(404).send('There is no company for such email')
      }
});

//POST: CREATE A NEW COMPANY
router.post('/companies',async (req,res) => {
    const error = await validateCompany(req.body);
    if(error.companyemail){
        let company = new Company({
            email:req.body.companyemail,
            password:req.body.companypassword,
            name:req.body.companyname,
            address:req.body.companyaddress,
        });
        const email = company.email
        const emailexists = await Company.findOne({email:email})
        if(! emailexists){
            const savedcompany = await company.save()
            res.send(savedcompany)
        }else{
            res.status(400).send('This company already exists')
        }
    }else{
        res.status(400).send(error.message)
    }
});

router.put("/companies/:companyId", async (req,res) => {
    
    const updatedCompany = await Company.findByIdAndUpdate(req.params.companyId,
    {   
        $push: {Contractsuploaded: req.body.companyContractsuploaded},
        email:req.body.companyemail,
        password:req.body.companypassword,
        name:req.body.companyname,
        address:req.body.companyaddress,
    });
    if (!updatedCompany) res.status(404).send("company not found");
    res.send(updatedCompany);
});
//CONTRACTS METHODS


//GET ALL CONTRACTS

router.get("/contracts", (req,res) => {
    Contract.find()
        .then((contracts) => res.send(contracts))
        .catch((error) => {
            return res.status(500).send(error.message);
        });
});

//GET A CONTRACT BY NAME

router.get("/contracts/:name", async (req,res) => {
    const name = req.params.name
    try {
        const doc = await Contract.findOne({ name: name })
        if (!doc) {
          throw new Error('no contract found')
        }
        res.json({ company: doc })
      } catch {
        res.status(404).send('There is no contract for such name')
      }
});



//POST CONTRACT
router.post('/contracts',async (req,res) => {
    let contract = new Contract({
        name:req.body.contractname,
        startDate:req.body.contractstartDate,
        endDate:req.body.contractendDate,
        contractPDF: req.body.contractpdf
    });
    const name = contract.name
    const nameexists = await Contract.findOne({name:name})
    if(! nameexists){
        const savedcontract = await contract.save()
        res.send(savedcontract)
    }else{
        res.status(400).send('This contract already exists')
    }



});





module.exports = router;
