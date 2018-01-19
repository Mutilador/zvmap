var markers = [] 

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

//Convert o x,y do UO para a latitude e longetude do google maps.
function convertLatLongToUO(x, y, map)
{
    longUO = 0;
    latUO = 0;    
    if(map == "0" || map == "1")
    {
        longUO = -179.99999999-((-157.55556666/7168)*x);
        latUO = 85.11000000-(((18.008079999/4096)*y)/2);
    }else if (map == "2" || map == "3") {
        
    }else if ( map == "4") {
        
    }     

    return new google.maps.LatLng(latUO, longUO);
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
            }
            
            if(mapId == ponto.map)
            {
                console.log(mapId);
                addPlayerMarker(index, ponto);
            }
            
            
        });

    });

}

function addPlayerMarker(index, ponto){
    var marker_map = new google.maps.Marker({
        position: new convertLatLongToUO(ponto.x,ponto.y,ponto.map),
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
