# iseP4JMeter
Código para el ejercicio de JMeter Práctica 4

El servidor se distribuye en forma de una aplicación de contenedores Docker sobre Compose. Ambas aplicaciones deben estar instaladas para ejecutar el servidor: 
  Docker Community Edition: https://docs.docker.com/install/
  Docker Compose: https://docs.docker.com/compose/

Tras descargar el código, situarse en el directorio principal (al mismo nivel del archivo docker-compose.yml y ejecutar: 
  docker-compose up 
  
Para parar la aplicación ejecutar: 
  docker-compose down 
  
Docker descargará las imágenes de contenedores asociados y construirá las nuevas imagenes para al aplicacion. 

Accediendo con un navegador a http://localhost:3000 debe presentarse la descripción básica de la api

Para una prueba más detallada de que el entorno funciona, instala curl y ejecuta el script pruebaEntorno.sh. Como resultado, debe obtener el objeto Json de un alumno valido. 

El subdirectorio jMeter contiene los archivos necesarios para realizar la sesión de prácticas: 
    alumnos.csv: Archivo con credenciales de alumnos
    administradores.csv: Archivo con credenciales de administradores
    apiAlumno.log: Log de accesso Http en formato apache. 
    
    
  
  
