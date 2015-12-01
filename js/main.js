//--------------------------- CODIGO JAVASCRIPT ----------------------//
//- Al cargarse la pagina, lo primero que haremos por defecto sera la
//- llamada a la funcion que se encarga de obtener las coordenadas del 
//- usuario.
//- Cargamos las provincias mediante PARSE
//- Obtenemos las coordenadas por cada vez que se elige una provincia

$( document ).ready(function() {
    
//***************** ENLACE CON LA API DE PARSE ***********************//
Parse.initialize("ehLDIQPkun90BtECgs0FfpBizCwfdRMa4GPiVvYY", "i5J8U5gSKXNV0YVNey9U94Mkn864ifk7xJvflg9P");
    
    getCoords();
    getCountries();    
    getgeoCode();
    
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
function initMap(pos, cityandcountry) {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 11,
    disableDefaultUI: true
  });
  var infoWindow = new google.maps.InfoWindow({map: map,maxWidth: 200});
  infoWindow.setPosition(pos);
  map.setCenter(pos);
    
  weatherData=getJsonDataWeather(pos.lat, pos.lng,cityandcountry);
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
function getJsonDataWeather(latitud, longitud, cityandcountry){

      var ApiWeatherUrl;

      if (cityandcountry!=" "){

         ApiWeatherUrl="http://api.openweathermap.org/data/2.5/weather?units=metric&q="+ cityandcountry +
         "&APPID=71381e39f2a1a57a768c92a11fff4cc5&lang=es";  

      }

      else

      {
         ApiWeatherUrl="http://api.openweathermap.org/data/2.5/weather?units=metric&lat="+
         latitud +"&lon="+ longitud +"&APPID=71381e39f2a1a57a768c92a11fff4cc5&lang=es";

      }

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

                 "&ordm;C </b><img height=35px src='http://openweathermap.org/img/w/"+

                 json.weather[0].icon+".png'/><br/>"+

                 json.weather[0].description+"<br/> Humedad: <b>"+

                 json.main.humidity+"&#37;</b><br/>T. Min.: <b>"+

                 degreesMin+"&ordm;C</b> T. Max.: <b>"+

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

            $('#controlCountries')
            .append("<option value='"
                    +object.get('nombreProvincia')+", "+object.get('cod_Pais')+"' >"
                        +object.get('nombreProvincia')+"</option>");

            $('#controlCountrCollapse')
            .append("<option value='"
                    +object.get('nombreProvincia')+", "+object.get('cod_Pais')+"' >"
                        +object.get('nombreProvincia')+"</option>");
        }
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
    
}

//Está funcion se encarga de obtener las coordenadas cada vez que selecciona una provincia en las dos 
//listas desplegables

function getgeoCode(){
    
    $('#controlCountries').change(function() { 
        var geocoder = new google.maps.Geocoder();          
        var address = $("#controlCountries option:selected").text();
        var value   = $("#controlCountries").val();  
        
        if (value!="nullValue"){
            geocodeCountries(geocoder,address,value);
            } 
    }); 
    
    $('#controlCountrCollapse').change(function() {
        var geocoder = new google.maps.Geocoder(); 
        var address = $("#controlCountrCollapse option:selected").text();
        var value   = $("#controlCountrCollapse").val();                   
        
        
        if (value!="nullValue"){
            geocodeCountries(geocoder,address,value);
        }
    }); 
    

    function geocodeCountries(geocoder,address,value){
        var pos;
        geocoder.geocode({'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            
            //console.log(results[0].geometry.location.lat());
            //console.log(results[0].geometry.location.lng());
            
            pos = {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
            }
            initMap(pos,value);            

        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
}

//----------------------- FIN CODIGO JAVASCRIPT ----------------------//
