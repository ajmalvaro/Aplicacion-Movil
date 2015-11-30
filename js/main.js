//--------------------------- CODIGO JAVASCRIPT ----------------------//
//- Al cargarse la pagina, lo primero que haremos por defecto sera la
//- llamada a la funcion que se encarga de obtener las coordenadas del 
//- usuario.
//- Cargamos las provincias mediante PARSE

$( document ).ready(function() {
    
//***************** ENLACE CON LA API DE PARSE ***********************//
Parse.initialize("ehLDIQPkun90BtECgs0FfpBizCwfdRMa4GPiVvYY", "i5J8U5gSKXNV0YVNey9U94Mkn864ifk7xJvflg9P");
    
    getCoords();
    getCountries();    
    
});
//-
//************************ FUNCION GETCOORDS() ***********************//
//- Esta funcion obtiene las coordenadas mediante el objeto 
//- navigator.geolocation soportado por HTML5. En caso de no poder 
//- obtenerlas, mostrará un mensaje descriptivo de error.
//- En caso de éxito, devuelve el objeto 'pos' con las propiedades lat 
//- (latitud) y long (longitud).
//-
function getCoords(){ 
navigator.geolocation.getCurrentPosition( function(position) { 
var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      initMap(pos); }, 
function(error){ alert(error.message); }, 
{ enableHighAccuracy: true ,timeout : 20000 } ); 
}
//-
//********************* FIN FUNCION GETCOORDS() **********************//
//-
//************************ FUNCION INITMAP() *************************//
//- Esta funcion se encarga de 'pintar' el mapa de google en pantalla, 
//- posicionarse y generar la 'globa'. A mayores, interactua con la 
//- funcion que obtiene los datos de el tiempo para rellenar la 'globa'.
//-
function initMap(pos) {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 11
  });
  var infoWindow = new google.maps.InfoWindow({map: map,maxWidth: 200});
  infoWindow.setPosition(pos);
  map.setCenter(pos);
  weatherData=getJsonDataWeather(pos.lat, pos.lng);
  infoWindow.setContent(weatherData.toString());
}
//-
//************************ FIN FUNCION INITMAP() *********************//
//-
//****************** FUNCION GETJSONDATAWEATHER() ********************//
//- Esta funcion se encarga de conectarse con la api de openweathermap 
//- para recoger los datos  de la temperatura en funcion de las 
//- coordenadas que recibe como parametro (latitud, longitud).Devuelve 
//- un 'string' formateado en html con datos del clima.
//-
function getJsonDataWeather(latitud, longitud){
	  var ApiWeatherUrl="http://api.openweathermap.org/data/2.5/weather?units=metric&lat="+
      latitud +"&lon="+ longitud +"&APPID=71381e39f2a1a57a768c92a11fff4cc5&lang=es";
      var mydata;
      var degrees;
      var degreesMin;
      var degreesMax;
	  $.ajax({
    	url: ApiWeatherUrl,
    	async: false,
    	dataType: 'json',
    	success: function (json) {
        degrees=parseInt(json.main.temp);
        degreesMin=parseInt(json.main.temp_min);
        degreesMax=parseInt(json.main.temp_max);
    	mydata = "<b>"+json.name+" </b><b>"+degrees+
                 "&ordm;C </b><img src='http://openweathermap.org/img/w/"+
                 json.weather[0].icon+".png'/> <br/>"+
                 json.weather[0].description+"<br/> Humedad: <b>"+
                 json.main.humidity+"&#37;</b><br/>Temp. minima: <b>"+
                 degreesMin+"&ordm;C</b><br/>Temp. maxima: <b>"+
                 degreesMax+ "&ordm;C</b>";
  }
});
	return mydata; 
}
//***************** FIN FUNCION GETJSONDATAWEATHER() *****************//
//-



//- Recuperamos los datos de la provincia mediante parse
function getCountries(){
    
    var Provincias = Parse.Object.extend("Provincias");
    var query = new Parse.Query(Provincias);

    query.find({
      success: function(results) {
        for (var i = 0; i < results.length; i++) {
          var object = results[i];

          //alert(object.id + ' - ' + object.get('nombreProvincia'));
          $('#controlCountries').append("<option>"+object.get('nombreProvincia')+"</option>");
          $('#controlCountrCollapse').append("<option>"+object.get('nombreProvincia')+"</option>");
        }
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
    
}

//----------------------- FIN CODIGO JAVASCRIPT ----------------------//
