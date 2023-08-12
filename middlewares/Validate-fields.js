const { validationResult } = require('express-validator');

// se encarga de validar todos los campos en mongo db
const validateFields = (req, res, next) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() )
        return res.status(400).json(errors);

    next();
}


module.exports = {
    validateFields
}

