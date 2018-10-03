mongo mongodb/etsii --eval 'db.alumnos.drop();'
mongo mongodb/etsii --eval 'db.usuarios.drop();'

mongoimport --host mongodb --db etsii --collection alumnos --type json --file generated_alumnos.json --jsonArray

mongo mongodb/etsii --eval 'db.alumnos.createIndex({"email":1},{"unique":1});'

mongo mongodb/etsii --eval 'db.alumnos.find({},{usuarioObj:1,_id:0}).forEach(function(d){db.usuarios.insert((d.usuarioObj))});'

mongo mongodb/etsii --eval 'db.alumnos.update({}, {$unset: {usuarioObj: 1}}, {multi: true});'

mongo mongodb/etsii --eval 'db.usuarios.createIndex({"id":1},{"unique":1});'

mongoimport --host mongodb --db etsii --collection usuarios --type json --file generated_admin.json --jsonArray
