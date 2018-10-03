const express = require('express');
const basicAuth = require('express-basic-auth');
const auth=require('../../../modules/auth');
const usurio=require('../../../models/usuarios');
const config=require('../../../config');
const { celebrate, Joi, errors } = require('celebrate');


const router = express.Router();

// Setup basic Auth for the login
let basicAuthUser={};
basicAuthUser[config.basicAuthLogin]=config.basicAuthPassword;

router.use('/login',
    basicAuth({
        users: basicAuthUser
    }))

router.post('/login',
    celebrate({
        body:Joi.object().keys({
            login: Joi.string().required(),
            password: Joi.string().required()
        })
    }),
    function(req, res, next) {
    //TODO HMAC credentias to pevent 3rd party
    let exp;
    const email=(exp=req.body.login)?exp.trim().toLocaleLowerCase():exp;
    const password=(exp=req.body.password)?exp.trim():exp;

    usurio.find({
            login: email,
            password: password
        },
        (err,usuarios)=>{
            if(err) next(err);
            else if(usuarios.length!=1){
                var invalidCredentials=new Error("Invalid Credentials");
                invalidCredentials.status=404;
                next(invalidCredentials);
            }else {
                let usuario = usuarios[0];
                res.send(auth.autheticate({id: usuario.id, role: usuario.rol}));
            }
        }
    );
});

router.use(errors())

module.exports=router;
