var publicConfig = {
  key: 'AIzaSyBanDmzeN2egvGO-TzZkrrFa9dDNOhavhU',
  stagger_time:       1000, // for elevationPath
  encode_polylines:   false,
  secure:             true, // use https
  proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests
};
var gmAPI = new GoogleMapsAPI(publicConfig);



let map;
let service;
let infowindow;
let marker;


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
      center: {lat:-23.66389, lng:-46.53833},
      zoom: 14
    });


  let santoAndre = new google.maps.LatLng(-23.66389, -46.53833);

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(
      document.getElementById('map'), {center: santoAndre, zoom: 15});

  
    let request = {
    query: 'Rua Coronel Francisco Amaro',
    fields: ['name', 'geometry'],
  };

  let service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      map.setCenter(results[0].geometry.location);
    }
  });
}


function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, search);
  });
}

let local = getElementById('local')
cep.addEventListener("focusout", () =>{
createMarker(local)
})


  

  

