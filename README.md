# Aplicacion-Movil
Practica final modulo Desarrollo de aplicaciones Web multiplataforma 2015/16
Aplicación web responsive consistente en mostrar los datos de la temperatura de una ubicación en concreto situada en un mapa de google 
maps.
Consta de 3 opciones:

  **Por defecto, al cargar la aplicación web, si el usuario permite el uso de la geolocalización de su dispositivo y a su vez, el dispositivo
 puede devolvernos la ubicacion (coordenadas: latitud y longitud extraidas de el objeto navigator de HTML5) automaticamente se mostrará
 un mapa posicionado en la localización del usuario mostrando los datos de la temperatura del lugar.
 
  **Mediante una lista desplegable precargada con ciudades concretas y recuperadas desde el servicio Parse, el usuario podrá seleccionar una 
 de ellas que se mostrará en el mapa junto con los datos de la temperatura de la ciudad.
 
  **Mediante una caja de texto con busqueda predictiva y autocompletado a partir de la tercera letra que ingrese el usuario, se podrá elegir
 una de las localizaciones coincidentes por nombre que devuelva google Places. Al ser seleccionada, se mostrará en el mapa junto con los 
 datos de la temperatura de la misma.
 
 Esta aplicación web esta desarrollada en HTML5, CSS3, Javascript y jquery e interactua con los siguientes frameworks/apis:
   **Bootstrap:     Framework utilizado para diseñar la estética de la aplicación.
   
   **Parse:         Servicio de almacenamiento que nos permite consultar datos a petición. Lo utilizamos para cargar la lista desplegable de 
                    provincias.
                    
   **Google Maps:   Servicio de google que ofrece la inclusion de mapas en nuestro sitio, nos servimos de el para mostrar en un mapa
                    una ubicación concreta.
                    
   **Google Places: Servicio de google de consulta de sitios. Utilizamos este servicio para la búsqueda predictiva de lugares en función
                    de lo que ingrese el usuario en una caja de texto.

# Fernando y Álvaro, 2015.
