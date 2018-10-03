let mongoose=require('mongoose');
let Schema=mongoose.Schema;

let cursoSchema=new Schema({
    curso:Number,
    media:Number
});

let alumnoSchema=new Schema(
    {
        nombre: String,
        apellidos: String,
        sexo: String,
        email: String,
        fechaNacimiento: Date,
        comentarios: String,
        cursos: [cursoSchema],
        usuario: Number
    },
    {
        collection:'alumnos'
    }
    );


let alumonModel=mongoose.model('Alumno',alumnoSchema);
module.exports=alumonModel;

