const  { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: { 
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    mail: { 
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: { 
        type: String,
        required: [true, 'La contraseña es obligatorio']        
    },
    img: { 
        type: String     
    },
    rol: { 
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']       
    },
    status: { 
        type: Boolean,
        default: true        
    },
    google: { 
        type: Boolean,
        default: false       
    }
});

// este metodo se encara de devolver la entidad pero quitandole alguno atributos
UsuarioSchema.methods.toJSON = function() {
  const {__v, password, ...UserDTO} = this.toObject();

  return UserDTO;
}

module.exports = model( 'user', UsuarioSchema );