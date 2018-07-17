var map;
var infoWindow;
var markers = [];

var feluccaTypeOptions = {
  getTileUrl: function(coord, zoom) {
      var normalizedCoord = getNormalizedCoord(coord, zoom);
      if (!normalizedCoord) {
        return null;
      }
      var bound = Math.pow(2, zoom);
      return './api/maptile.php?' +
          'z=' + zoom + '&x=' + normalizedCoord.x + '&y=' +
          (normalizedCoord.y) + '&map=0';
  },
  tileSize: new google.maps.Size(208, 208),
  maxZoom: 7,
  minZoom: 3,
  isPng: true,
  name: 'Felucca'
};

var trammelTypeOptions = {
  getTileUrl: function(coord, zoom) {
      var normalizedCoord = getNormalizedCoord(coord, zoom);
      if (!normalizedCoord) {
        return null;
      }
      var bound = Math.pow(2, zoom);
      return './api/maptile.php?' +
          'z=' + zoom + '&x=' + normalizedCoord.x + '&y=' +
          (normalizedCoord.y)+'&map=1';
  },
  tileSize: new google.maps.Size(208, 208),
  maxZoom: 7,
  minZoom: 3,
  isPng: true,
  name: 'Trammel'
};

var ilshenarTypeOptions = {
  getTileUrl: function(coord, zoom) {
      var normalizedCoord = getNormalizedCoord(coord, zoom);
      if (!normalizedCoord) {
        return null;
      }
      var bound = Math.pow(2, zoom);
      return './api/maptile.php?' +
          'z=' + zoom + '&x=' + normalizedCoord.x + '&y=' +
          (normalizedCoord.y)+'&map=2';
  },
  tileSize: new google.maps.Size(208, 208),
  maxZoom: 7,
  minZoom: 3,
  isPng: true,
  name: 'Ilshenar'
};

var malasTypeOptions = {
  getTileUrl: function(coord, zoom) {
      var normalizedCoord = getNormalizedCoord(coord, zoom);
      if (!normalizedCoord) {
        return null;
      }
      var bound = Math.pow(2, zoom);
      return './api/maptile.php?' +
          'z=' + zoom + '&x=' + normalizedCoord.x + '&y=' +
          (normalizedCoord.y)+'&map=3';
  },
  tileSize: new google.maps.Size(208, 208),
  maxZoom: 5,
  minZoom: 3,
  isPng: true,
  name: 'Malas'
};

var tokunoTypeOptions = {
  getTileUrl: function(coord, zoom) {
      var normalizedCoord = getNormalizedCoord(coord, zoom);
      if (!normalizedCoord) {
        return null;
      }
      var bound = Math.pow(1, zoom);
      return './api/maptile.php?' +
          'z=' + zoom + '&x=' + normalizedCoord.x + '&y=' +
          (normalizedCoord.y)+'&map=4';
  },
  tileSize: new google.maps.Size(208, 208),
  maxZoom: 5,
  minZoom: 3,
  isPng: true,
  name: 'Tokuno'
};

var termurTypeOptions = {
  getTileUrl: function(coord, zoom) {
      var normalizedCoord = getNormalizedCoord(coord, zoom);
      if (!normalizedCoord) {
        return null;
      }
      var bound = Math.pow(1, zoom);
      return './api/maptile.php?' +
          'z=' + zoom + '&x=' + normalizedCoord.x + '&y=' +
          (normalizedCoord.y)+'&map=5';
  },
  tileSize: new google.maps.Size(208, 208),
  maxZoom: 5,
  minZoom: 3,
  isPng: true,
  name: 'Termur'
};

var feluccaMapType = new google.maps.ImageMapType(feluccaTypeOptions);
var trammelMapType = new google.maps.ImageMapType(trammelTypeOptions);
var ilshenarMapType = new google.maps.ImageMapType(ilshenarTypeOptions);
var malasMapType = new google.maps.ImageMapType(malasTypeOptions);
var tokunoMapType = new google.maps.ImageMapType(tokunoTypeOptions);
var termurMapType = new google.maps.ImageMapType(termurTypeOptions);

function initialize() {
	
	var cLL = new google.maps.LatLng(80.23850055,-102.48046875);

	var mapOptions = {
	center: cLL,
	zoom: 3,
	backgroundColor: "#FFFFFF",
	streetViewControl: false,
	mapTypeControl: false,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
			mapTypeIds: ['felucca','trammel','ilshenar','malas','tokuno','termur']
		}
	};

	map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
	map.mapTypes.set('felucca', feluccaMapType);
	map.setMapTypeId('felucca');
	

	// Cria a nova Info Window com referência à variável infoWindow.
	// O conteúdo da Info Window é criado na função createMarker.
	infoWindow = new google.maps.InfoWindow();

	// Evento que fecha a infoWindow com click no mapa.
	map.addListener('click', function() {
	   infoWindow.close();
	});

	var worldDiv = document.createElement('div');
	worldDiv.id = 'worldDiv';
	var selectWorld = document.createElement('select');
	selectWorld.id = "selectWorld";
	worldDiv.appendChild(selectWorld);
	
	var worldList = ["felucca","trammel","ilshenar","malas","tokuno","termur"];

	for(var i = 0; i < worldList.length; i++)
	{
		var option = document.createElement("option");
		option.value = worldList[i];
		option.text = worldList[i];
		selectWorld.appendChild(option);
	}
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(worldDiv);
            
	google.maps.event.addDomListener(selectWorld, 'click', function() {                
		if (this.value == "felucca")
		{
                    map.mapTypes.set('felucca', feluccaMapType);
                    map.setMapTypeId('felucca');
                    map.setZoom(3);
                    map.setCenter(new google.maps.LatLng(80.23850055,-102.48046875));
                    carregarPontos(map.getMapTypeId());
		}else if (this.value == "trammel"){
                    map.mapTypes.set('trammel', trammelMapType);
                    map.setMapTypeId('trammel');
                    map.setZoom(3);
                    map.setCenter(new google.maps.LatLng(80.23850055,-102.48046875));
                    carregarPontos(map.getMapTypeId());
		}else if (this.value == "ilshenar"){
                    map.mapTypes.set('ilshenar', ilshenarMapType);
                    map.setMapTypeId('ilshenar');
                    map.setZoom(3);
                    map.setCenter(new google.maps.LatLng(72.91963547, -88.06640625));
                    carregarPontos(map.getMapTypeId());
		}else if (this.value == "malas"){
                    map.mapTypes.set('malas', malasMapType);
                    map.setCenter(new google.maps.LatLng(67.87554135, -36.56250000));
                    map.setMapTypeId('malas');
                    map.setZoom(3);                        
                    carregarPontos(map.getMapTypeId());
		}else if (this.value == "tokuno"){
                    map.mapTypes.set('tokuno', tokunoMapType);
                    map.setMapTypeId('tokuno');
                    map.setZoom(3);
                    map.setCenter(new google.maps.LatLng(33.43144134, -46.75781250)); 
                    carregarPontos(map.getMapTypeId());
		}else if (this.value == "termur"){
                    map.mapTypes.set('termur', termurMapType);
                    map.setMapTypeId('termur');
                    map.setZoom(5);
                    map.setCenter(new google.maps.LatLng(80.23850055, -46.75781250)); 
                    carregarPontos(map.getMapTypeId());
		}else{
                    map.mapTypes.set('felucca', feluccaMapType);
                    map.setMapTypeId('felucca');
                    map.setZoom(3);
                    map.setCenter(new google.maps.LatLng(80.23850055,-102.48046875));
                    carregarPontos(map.getMapTypeId());
		}
	});
        
	
        
       
}


// Normalizes the coords that tiles repeat across the x axis (horizontally)
// like the standard Google map tiles.
function getNormalizedCoord(coord, zoom) {
  var y = coord.y;
  var x = coord.x;

  // tile range in one direction range is dependent on zoom level
  // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
  var tileRange = 1 << zoom;

  // don't repeat across y-axis (vertically)
  if (y < 0 || y >= tileRange) {
    return null;
  }

  // repeat across x-axis
  if (x < 0 || x >= tileRange) {
    return null; //x = (x % tileRange + tileRange) % tileRange;
  }

  return {
    x: x,
    y: y
  };
}

window.onload = initialize();

google.maps.event.addListener(map, 'mousemove', function (event) {
              displayCoordinates(event.latLng);               
          });


function displayCoordinates(pnt) {

          var lat = pnt.lat();
          lat = lat.toFixed(8);
          var lng = pnt.lng();
          lng = lng.toFixed(8);
          
          console.log("Latitude: " + lat + "  Longitude: " + lng);
}
      

	//google.maps.event.addDomListener(window, 'load', initialize);
	
