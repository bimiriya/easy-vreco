class Localization {
  constructor(callback) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(this.latitude);
        console.log(this.longitude);

        callback();
      });
    } else {
      alert('Problemas de ubicación');
    }
  }
}
var map;
// INICIALIZAR MAPA
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: { lat: -33.4533624, lng: -70.7142131 }
  });

  document.getElementById('ubication').addEventListener('click', searchMe);
  document.getElementById('btn-ruta').addEventListener('click', calculateAndDisplayRoute);


  var infoWindow = new google.maps.InfoWindow({ map: map });
  let autocompleteA = document.getElementById('origin');
  const searchA = new google.maps.places.Autocomplete(autocompleteA);
  searchA.bindTo('bounds', map);

  let autocompleteB = document.getElementById('destiny');
  const searchB = new google.maps.places.Autocomplete(autocompleteB);
  searchB.bindTo('bounds', map);

  // calculateAndDisplayRoute(directionsService, directionsDisplay);
  // document.getElementById('mode').addEventListener('change', function () {
  //   calculateAndDisplayRoute(directionsService, directionsDisplay);
  // });

  // BUSCA MI UBICACION
  function searchMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        let option = {
          center: pos,
          zoom: 18
        }
        //positionMap = pos;
        // infoWindow.setPosition(pos);
        // infoWindow.setContent('Location found.');
        //map.setCenter(pos);
        let map = document.getElementById('map');
        const mapa = new google.maps.Map(map, option);
        const marker = new google.maps.Marker({
          position: pos,
          map: mapa,
          title: 'Esto es un marcador'
        });
        var text = '<h1>Nombre del lugar</h1>' + '<p>Descripción del lugar</p>' + '<a href="#">Página web</a>';
        let information = new google.maps.InfoWindow({
          content: text
        });

        marker.addListener('click', function () {
          information.open(mapa, marker);
        });
      }, function () {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    }
  }
}

// ENCUENTRA LA RUTA
function calculateAndDisplayRoute() {
 directionsService = new google.maps.DirectionsService;
 directionsDisplay = new google.maps.DirectionsRenderer;
  var selectedMode = document.getElementById('mode').value;
  //let map = document.getElementById('map');

  var objDR = {
    origin: document.getElementById('origin').value,
    destination: document.getElementById('destiny').value,
    travelMode: google.maps.TravelMode[selectedMode],
  }


  directionsService.route(objDR, function (response, status) {
    if (status === 'OK') {
      directionsDisplay.setMap(map);
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
// CAMBIAR TIPO DE RUTA
// function calculateAndDisplayRoute(directionsService, directionsDisplay) {
//   var selectedMode = document.getElementById('mode').value;
//   directionsService.route({
//     origin: { lat: -33.4533624, lng: -70.7142131 },  // Haight.
//     destination: { lat: -33.4163266, lng: -70.6427959 },  // Ocean Beach.
//     // Note that Javascript allows us to access the constant
//     // using square brackets and a string value as its
//     // "property."
//     travelMode: google.maps.TravelMode[selectedMode]
//   }, function (response, status) {
//     if (status == 'OK') {
//       directionsDisplay.setDirections(response);
//     } else {
//       window.alert('Directions request failed due to ' + status);
//     }
//   });
// }

// BUSCA MI UBICACION
// let ubication = document.getElementById('ubication');
// ubication.addEventListener('click', function () {
//   // google.maps.event.addDomListener(ubication, 'click', function () {

//   const myUbication = new Localization(() => {
//     const latAndLong = { lat: myUbication.latitude, lng: myUbication.longitude };
//     var text = '<h1>Nombre del lugar</h1>' + '<p>Descripción del lugar</p>' + '<a href="#">Página web</a>'
//     let option = {
//       center: latAndLong,
//       zoom: 18
//     }
//     let map = document.getElementById('map');
//     const mapa = new google.maps.Map(map, option);
//     const marker = new google.maps.Marker({
//       position: latAndLong,
//       map: mapa,
//       title: 'Esto es un marcador'
//     });

//     let information = new google.maps.InfoWindow({
//       content: text
//     });

//     marker.addListener('click', function () {
//       information.open(mapa, marker);
//     });

//     let autocompleteA = document.getElementById('origin');
//     const searchA = new google.maps.places.Autocomplete(autocompleteA);
//     searchA.bindTo('bounds', mapa);

//     let autocompleteB = document.getElementById('destiny');
//     const searchB = new google.maps.places.Autocomplete(autocompleteB);
//     searchB.bindTo('bounds', mapa);
//   });
// });
// BUSCAR RUTA

// function calcRoute() {
//   let start = document.getElementById('origin').value;
//   let end = document.getElementById('destiny').value;
//   let request = {
//     origin: start,
//     destination: end,
//     travelMode: 'DRIVING'
//   };
//   directionsService.route(request, function (result, status) {
//     if (status == 'OK') {
//       directionsDisplay.setDirections(result);
//     }
//   });
// }
// var btnRuta = document.getElementById('btn-ruta');
// btnRuta.addEventListener('click', calcRoute)



