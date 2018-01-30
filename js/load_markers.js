var markers = [] 

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

//google.maps.event.addDomListener(map, 'zoom_changed', function() {
//  var zoom = map.getZoom();
//  
//});
        
//google.maps.event.addDomListener(map, 'click', function(event){
//   var proj = map.getProjection();
//   console.log(proj.fromLatLngToPoint(new google.maps.LatLng(85.00000000,-180.00000000)));
//   console.log(proj.fromLatLngToPoint(new google.maps.LatLng(56.20000000,-10.00000000)));
//    //console.log(proj.fromPointToLatLng(new google.maps.Point(x,y)).lat());
//    ///console.log(proj.fromPointToLatLng(new google.maps.Point(x,y)).lng());
//});

//Convert o x,y do UO para a latitude e longetude do google maps.
function convertLatLongToUO(xuo, yuo, mapuo)
{
    var proj = map.getProjection();
        
    var x = 0;
    var y = 0;    
    
    if(mapuo == "0" || mapuo == "1")
    {
        x = (112.3555555555555/7168)*xuo;
        y = (64.02365437241997/4096)*yuo;
    }else if (mapuo == "2") {
        x = (143.9288888888889/2304)*xuo;
        y = (100.08664990702526/1600)*yuo;         
    } else if (mapuo == "3") {
        x = (160.00000000/2560)*xuo;
        y = (128.00000000/2048)*yuo;    
    }else if ( mapuo == "4") {
        x = (208.-0000000/1448)*xuo;
        y = (207.9495506023008/1448)*yuo; 
    }else if ( mapuo == "5") {
        x = (120.888888888888/1944)*xuo;
        y = (79.46169542855448/1270)*yuo; 
    }      

    return proj.fromPointToLatLng(new google.maps.Point(x,y));

}



/*
    Carrega os pontos de todos os players no mapa.
*/
function carregarPontos(mapTypeId) {
    setMapOnAll(null);
    markers = [];
    $.getJSON('tools/players.json', function(player) {

        $.each(player, function(index, ponto) {
        		
            mapId = 0;
            
            if(mapTypeId == 'trammel'){
                mapId = 0;
            }else if(mapTypeId == 'felucca'){
                mapId = 1;
            }else if(mapTypeId == 'ilshenar'){
                mapId = 2;
            }else if(mapTypeId == 'malas'){
                mapId = 3;
            }else if(mapTypeId == 'tokuno'){
                mapId = 4;
            }else if(mapTypeId == 'termur'){
                mapId = 5;
            }
            
            if(mapId == ponto.map)
            {                
                addPlayerMarker(index, ponto);
            }
            
            
        });

    });

}

function addPlayerMarker(index, ponto){
    var projection = map.getProjection()
    var marker_map = new google.maps.Marker({
        position: new convertLatLongToUO(ponto.x,ponto.y,ponto.map),
        //position: new google.maps.LatLng(36.50000000,22.40000000),
        map: map,
        title: ponto.name,
    });
    
    // Evento que d� instru��o � API para estar alerta ao click no marcador.
    // Define o conte�do e abre a Info Window.
    google.maps.event.addListener(marker_map, 'click', function() {
            // Vari�vel que define a estrutura do HTML a inserir na Info Window.
            var iwContent = '<div id="iw_container">' +
                '<div class="iw_title"><b>' + ponto.name + '</b></div>' +
                 '<div class="iw_content"><br/><b>Posi��o: </b>' + ponto.x +', '+ponto.y+', '+ponto.z + ', ' +
                ponto.map + '<br /><br /><b>Str: </b>' + ponto.str + '</div><br />' +
                '<b>Int: </b>' + ponto.int + '</div><br />' +
                '<b>Dex: </b>' + ponto.dex + '</div><br />' +
                 '</div>';

        // O conte�do da vari�vel iwContent � inserido na Info Window.
        infoWindow.setContent(iwContent);

        // A Info Window � aberta com um click no marcador.
        infoWindow.open(map, marker_map);

    });	
    
    markers.push(marker_map);
}

google.maps.event.addListenerOnce(map, 'tilesloaded', function(evt) {
    
    
    carregarPontos(map.getMapTypeId());    
});
