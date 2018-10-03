const express = require('express');
const router = express.Router();

router.use('/auth',require('./apiAuth'));
router.use('/alumnos',require('./apiAlumno'));

module.exports=router;