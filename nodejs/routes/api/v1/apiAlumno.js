const express = require('express');
const alumnos=require('../../../models/alumnos');
const auth=require('../../../modules/auth');
const config=require('../../../config/index');
const { celebrate, Joi, errors } = require('celebrate');

const router = express.Router();

router.use('/alumno',
    auth.isAuthenticated
);

router.get('/alumno/:email',
    celebrate({
        params:Joi.object().keys({
            email: Joi.string().required().email()
        })
    }),
    function(req, res, next) {
    let usuario=auth.getUser(req);
    let alunoEmail=req.params.email;
    alumnos.findOne({email:alunoEmail},
        (err,alumno)=>{
            if(err) next(err);
            if(!alumno){
                var alumnoNoExistente=new Error("El Alumno no existe");
                alumnoNoExistente.status=404;
                next(alumnoNoExistente);
            }
            else if (esUsuarioAutorizadoParaVerAlumno(usuario,alumno)) res.send(alumno);
            else {
                var unauthorizedRequest=new Error("Solo un administrador puede consultar los datos de otro alumno");
                unauthorizedRequest.status=403;
                next(unauthorizedRequest);
            }
        }
    );
});

function esUsuarioAutorizadoParaVerAlumno(usuario, alumno){
    return (usuario.role===auth.ROLES.ADMINISTRADOR
        ||  (usuario.role===auth.ROLES.ALUMNO
            && usuario.id===alumno.usuario));
}

router.use(errors());

module.exports=router;