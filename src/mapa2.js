
var geocoder2;
var map2;
var marker2;
 
function initialize() {
    var latlng = new google.maps.LatLng(-18.8800397, -47.05878999999999);
    var options = {
        zoom: 5,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    map2 = new google.maps.Map(document.getElementById("mapa2"), options);
 
    geocoder2 = new google.maps.Geocoder();
 
    marker2 = new google.maps.Marker({
        map: map2,
        draggable: true,
    });
 
    marker2.setPosition(latlng);
}
 
$(document).ready(function () {
    initialize();
    function carregarNoMapa(endereco) {
        geocoder2.geocode({ 'address': endereco + ', Brasil', 'region': 'BR' }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();
 
                    $('#localPetEncontrado').val(results[0].formatted_address);
                    $('#txtLatitude2').val(latitude);
                    $('#txtLongitude2').val(longitude);
 
                    var location = new google.maps.LatLng(latitude, longitude);
                    marker2.setPosition(location);
                    map2.setCenter(location);
                    map2.setZoom(16);
                }
            }
        });
    }
    $("#btnEndereco2").click(function() {
        if($(this).val() != "")
            carregarNoMapa($("#localPet").val());
    })
 
    $("#localPetEncontrado").blur(function() {
        if($(this).val() != "")
            carregarNoMapa($(this).val());
    })

    google.maps.event.addListener(marker2, 'drag', function () {
        geocoder2.geocode({ 'latLng': marker2.getPosition() }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) { 
                    $('#localPetEncontrado').val(results[0].formatted_address);
                    $('#txtLatitude2').val(marker2.getPosition().lat());
                    $('#txtLongitude2').val(marker2.getPosition().lng());
                }
            }
        });
    });
    $("#localPetEncontrado").autocomplete({
        source: function (request, response) {
            geocoder2.geocode({ 'address': request.term + ', Brasil', 'region': 'BR' }, function (results, status) {
                response($.map(results, function (item) {
                    return {
                        label: item.formatted_address,
                        value: item.formatted_address,
                        latitude: item.geometry.location.lat(),
                        longitude: item.geometry.location.lng()
                    }
                }));
            })
        },
        select: function (event, ui) {
            $("#txtLatitude2").val(ui.item.latitude);
            $("#txtLongitude2").val(ui.item.longitude);
            var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
            marker2.setPosition(location);
            map2.setCenter(location);
            map2.setZoom(16);
        }
    });
});


