mongoexport --host localhost --db etsii --collection usuarios --type csv --fields login,password --query '{rol: "Administrador"}'
