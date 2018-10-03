let mongoose=require('mongoose');
let Schema=mongoose.Schema;


let usuarioSchema=new Schema(
    {
    id: Number,
    login: String,
    password: String,
    rol:String
    },
    {
        collection: 'usuarios'
    });

let usuarioModel=mongoose.model('Usuario',usuarioSchema);

module.exports=usuarioModel;

