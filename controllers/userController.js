const { response } = require('express');
const encrypjs = require('bcryptjs');

const User = require('../models/Usuario');


const GetUser = async(req, res = response) => {
    const {pageSize, pageIndex} = req.query;

     // esta promesa ejecuta dos consultas de manera paralela
    const [count, users] = await Promise.all([User.countDocuments({status: true}),
                                              User.find({status: true})
                                                .skip(Number(pageIndex))
                                                .limit(Number(pageSize))]) 

    res.json({        
        count,
        users
    })
}

const PutUser = async (req, res = response) => {
    const {id} = req.params;
    const {password, google, ...data} = req.body;

     if(password) {
        const salt = encrypjs.genSaltSync();
        data.password = encrypjs.hashSync(password, salt);
     }
 
    const userDB = await User.findByIdAndUpdate(id, data);


    res.json({
        Servicio:'put',             
        userDB
    })
}

const  PostUser = async(req, res = response) => {
   
    const {name, mail, password, rol } = req.body;
    const user = new User({name, mail, password, rol });

    const salt = encrypjs.genSaltSync();
    user.password = encrypjs.hashSync(password, salt);

    await user.save();

    res.json({
        Servicio:'post',
        user
    })
}

const DeleteUser = async(req, res = response) => { 
    const {id} = req.params;

    //eliminacion de usuario fisica
    //const userDelete = await User.findByIdAndDelete(id);

    const userDelete = await User.findByIdAndUpdate(id, {status : false});

    res.json({
        userDelete
    })
}

module.exports = {
    GetUser,
    PutUser,
    PostUser,
    DeleteUser
}
