#mongosh mongodb/etsii --eval 'db.alumnos.drop();'
#mongosh mongodb/etsii --eval 'db.usuarios.drop();'

mongoimport --host mongodb --db etsii --collection alumnos --drop --type json --file generated_alumnos.json --jsonArray

mongoimport --host mongodb --db etsii --collection usuarios --drop --type json --file generated_admin.json --jsonArray

mongosh mongodb/etsii --eval 'db.alumnos.createIndex({"email":1},{"unique":1});'

mongosh mongodb/etsii --eval 'db.alumnos.find({},{usuarioObj:1,_id:0}).forEach(function(d){db.usuarios.insert((d.usuarioObj))});'

mongosh mongodb/etsii --eval 'db.alumnos.updateMany({}, {$unset: {usuarioObj: 1}}, {multi: true});'

mongosh mongodb/etsii --eval 'db.usuarios.createIndex({"id":1},{"unique":1});'