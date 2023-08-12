const Role = require('../models/Rol');
const User = require('../models/Usuario');


const IsRoleValid = async (rol = '') => {
    const existRole = await Role.collection.findOne({rol});
    //console.log(existRole)

    if(!existRole)
        throw new Error(`El rol ${rol} no es valido en la DB`)
}


const IsExistEmail = async(mail = '') => {
    console.log(mail)
      if (await User.collection.findOne({mail}))
          throw new Error(`El Email ${mail} ya existe`)      
}

const ExistUserById = async(id ) => {    
      if (!(await User.findById(id)))
          throw new Error(`El Id ${id} no existe`)      
}

module.exports = {
    IsRoleValid,
    IsExistEmail,
    ExistUserById
}

