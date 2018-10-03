const jwt = require('jwt-simple');
const config = require('../config');
const time = require('./time');
const REQUESTUSER="_etsiiUser";

const ROLES={
    "ALUMNO":"Alumno",
    "ADMINISTRADOR": "Administrador"
};

function getUser(req){
    return req[REQUESTUSER];
}

function setUser(req,user){
    req[REQUESTUSER]=user;
}

function getAuthenticatedUser(req){
    let token;
    if(token=getJWTToken(req)){
        let payload = jwt.decode(token, config.jwtTokenSecret);
        let user={
            id: payload.sub,
            role: payload.role
        }
        return user;
    }else {
        let userNonAuthenticated = new Error("Unauthenticed request");
        userNonAuthenticated.status = 401;
        throw userNonAuthenticated;
    }
}

function getJWTToken(req){
    let authHeader=req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer "))
        return authHeader.split(" ")[1];
}

function isAuthenticated(req,resp,next) {
    try {
        let user=getAuthenticatedUser(req);
        setUser(req,user);
    }catch(error){
        next(error);
    }
    next();
}

// Must be preceded always by isAuthenticated
function isAlumno(req,resp,next){
    if(getUser(req).role===ROLES.ALUMNO) next();
    else{
        let expiredAuthentication=new Error("Forbidden Request");
        expiredAuthentication.status=403;
        throw expiredAuthentication;
    }
}
// Must be preceded always by isAuthenticated
function isAdministrador(req,resp,next){
    let user=getUser(req);
    if(user && user.role===auth.ROLES.ADMINISTRADOR) next();
    else{
        let expiredAuthentication=new Error("Forbidden Request");
        expiredAuthentication.status=403;
        throw expiredAuthentication;
    }
}

function autheticate(user) {
    var nowInSeconds=time.nowInSeconds();
    var payload = {
        sub: user.id,
        iat: nowInSeconds,
        nbf: nowInSeconds-config.jwtTimeJitterInSeconds,
        exp: nowInSeconds+config.jwtTokenTTLInSecons+config.jwtTimeJitterInSeconds,
        role: user.role
    };
    return jwt.encode(payload, config.jwtTokenSecret);
}


module.exports={
    autheticate : autheticate,
    isAuthenticated : isAuthenticated,
    isAlumno : isAlumno,
    isAdministrador: isAdministrador,
    getUser:getUser,
    ROLES:ROLES
};

