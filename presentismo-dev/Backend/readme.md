# MisActividades backend

# Configuracion de entorno
El programa requiere de la configuracion de una variable de entorno para saber donde buscar los properties
BACKEND_CONFIG_LOCATION

##### Configurar entorno en Windows
En windows, se debe agregar una variable de entorno del usuario o del sistema, 
ingresando a **panel de control > Editar las variables de entorno del sistema/cuenta** 
y agregando una nueva con nombre **BACKEND_CONFIG_LOCATION** y de valor, la ruta
de acceso a la carpeta donde se encuentran los application.properties

Por ejemplo: BACKEND_CONFIG_LOCATION = C:\misactividades\config\backend\