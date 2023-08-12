const {Router} = require('express');
const router = Router();
const { validateFields } = require('../middlewares/Validate-fields');
const { IsRoleValid, IsExistEmail, ExistUserById } = require('../helpers/db-validators');

const {GetUser, DeleteUser, PutUser, PostUser} = require('../controllers/userController');
const { check } = require('express-validator');


router.get('/', GetUser);

router.put('/:id', [
    check('id', 'No es un Id Valido').isMongoId().custom(ExistUserById),
    check('rol').custom(IsRoleValid),   
    validateFields
    ],PutUser);

router.post('/', [
        check('mail', 'El correo no es valido').isEmail().custom(IsExistEmail),      
        check('password', 'La contraseña es obligatoria, debe de contener mas de 6 caracteres').isLength({min: 6}),
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('rol').custom(IsRoleValid),      
        validateFields
    ], PostUser);

router.delete('/:id', [
    check('id', 'No es un Id Valido').isMongoId().custom(ExistUserById),
    validateFields
    ], DeleteUser);


module.exports = router;


