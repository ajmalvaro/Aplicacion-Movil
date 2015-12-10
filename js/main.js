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
    setListeners();
});
//-
//************************ FUNCION GETCOORDS() ***********************//
//- Esta funcion obtiene las coordenadas mediante el objeto 
//- navigator.geolocation soportado por HTML5. En caso de no poder 
//- obtenerlas, mostrarÃ¡ un mensaje descriptivo de error.
//- En caso de Ã©xito, devuelve el objeto 'pos' con las propiedades lat 
//- (latitud) y long (longitud).
//-
function getCoords(){ 
navigator.geolocation.getCurrentPosition( function(position) { 
var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      initMap(pos,null); }, 
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
      var mydata;
      var LocalityName;
      var degrees;
      var degreesMin;
      var degreesMax;
      
      ApiWeatherUrl="http://api.openweathermap.org/data/2.5/weather?units=metric&lat="+
      latitud +"&lon="+ longitud +"&APPID=71381e39f2a1a57a768c92a11fff4cc5&lang=es";

      

                  $.ajax({

                url: ApiWeatherUrl,

                async: false,

                dataType: 'json',

                success: function (json) {
               if (cityandcountry == null){
               	   LocalityName=json.name;
               }else{
               	   LocalityName=cityandcountry;  
               }

        degrees=parseInt(json.main.temp);

        degreesMin=parseInt(json.main.temp_min);

        degreesMax=parseInt(json.main.temp_max);

                mydata = "<b>"+LocalityName+" </b><b>"+degrees+

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
//************************ FUNCION GETCOUNTRIES() ********************//
//- Recuperamos los datos de la provincia mediante una tabla Provincias 
//- creada en PARSE
//-
function getCountries(){
    
    var Provincias = Parse.Object.extend("Provincias");
    var query = new Parse.Query(Provincias);

    query.find({
      success: function(results) {
        for (var i = 0; i < results.length; i++) {
            var object = results[i];

            $('#controlCountries')
            .append("<option value='"
                    +object.get('nombreProvincia')+"' >"
                        +object.get('nombreProvincia')+"</option>");

            $('#controlCountrCollapse')
            .append("<option value='"
                    +object.get('nombreProvincia')+"' >"
                        +object.get('nombreProvincia')+"</option>");
        }
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
    
}
//***************** FIN FUNCION GETCOUNTRIES() *********************//
//-
//************************ FUNCION GETGEOCODE() ********************//
//Esta funcion se encarga de obtener las coordenadas cada vez que selecciona 
//una provincia en las dos listas desplegables
//-
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
//***************** FIN FUNCION GETGEOCODE() *************************//
//-
//************************ FUNCION SETLISTENERS() ********************//
//Esta funcion crea los listeners para las cajas de texto que recibirán el 
//autocompletado de google places, controlando que solo se muestre si han pulsa-
//do 3 o mas teclas.
//-
function setListeners(){
       $("#pac-input").keyup(function(e) {
            $("#pac-input2").val("");      
            if ($("#pac-input").val().length < 3)
            {
                $('.pac-container').css("visibility", 'hidden');
            }
            else
            {
               $('.pac-container').css("visibility", 'visible');
            }
});  
        $("#pac-input2").keyup(function(e) {
            $("#pac-input").val("");
            if ($("#pac-input2").val().length < 3)
            {
                $('.pac-container').css("visibility", 'hidden');
            }
            else
            {
               $('.pac-container').css("visibility", 'visible');
            }
});  
getPlaces();
getPlaces2();
}
//***************** FIN FUNCION SETLISTENERS() *************************//
//-
//************************ FUNCION GETPLACES() *************************//
//Esta funcion se encarga de cargar el autocompletado 
//autocompletado de google places
//-
function getPlaces(){
var input = document.getElementById('pac-input');
var cityname;
  var searchBox = new google.maps.places.SearchBox(input, {
  types: ['cities']
});
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }
	var posCords = {
        lat: places[0].geometry.location.lat(),
        lng: places[0].geometry.location.lng()
      }
	cityname=places[0].address_components[0].long_name;
	initMap(posCords,cityname);
  });
}
//***************** FIN FUNCION GETPLACES() *************************//
//-
//************************ FUNCION GETPLACES2() *********************//
//Esta funcion se encarga de cargar el autocompletado 
//autocompletado de google places para la caja que se muestra en pantallas
//pequeñas (moviles).
//-
function getPlaces2(){
var input2 = document.getElementById('pac-input2');
var citycountry;
  var searchBox = new google.maps.places.SearchBox(input2, {
  types: ['cities']
});
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }
	var posCords = {
        lat: places[0].geometry.location.lat(),
        lng: places[0].geometry.location.lng()
      }
        cityname=places[0].address_components[0].long_name;
	initMap(posCords,cityname);
  });
}
//***************** FIN FUNCION GETPLACES2() *************************//
//-
//----------------------- FIN CODIGO JAVASCRIPT ----------------------//
