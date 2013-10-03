<?php
function convertToMC($x, $y) {
	$x -= 2560; // Source Offsets
	$y = 2048 - $y;

	$rotate = sin(deg2rad(45));

	$rX = $x * $rotate + $y * $rotate;
	$rY = -1 * $x * $rotate + $y * $rotate;

	$rX -= 69; // Padded Offsets
	$rY += 69;

	return array($rX / 3328 * 10, $rY / 3328 * 10); // Map Radius * Scale
}

function placeMarker($x, $y, $name, $text) {
	list($lng, $lat) = convertToMC($x, $y);
        echo "var $name = new google.maps.Marker({";
        echo "position: new google.maps.LatLng(" . $lat . "," . $lng . "),";
        echo "map: map,";
        echo "title: '$text'";
        echo "});";
}

function placeTreasureMarkers() {
	$file = @fopen('/home/zenvera/public_html/map/api/treasures.txt', "r");

	$index = 0;
	while (!feof($file)) {
		$index++;
		$line = fgets($file);
		if(empty($line))
			continue;
		list($x, $y) = explode(' ',$line);
		placeMarker($x, $y, "tMap$index", "Treasure Location $index");
	}

	fclose($file);
}

function drawRegion($x, $y, $w, $h, $name) {
	echo "var $name"."Coords = [";

	list($lng, $lat) = convertToMC($x,$y);
	echo "new google.maps.LatLng($lat,$lng),";
	list($lng, $lat) = convertToMC($x+$w,$y);
        echo "new google.maps.LatLng($lat,$lng),";
	list($lng, $lat) = convertToMC($x+$w,$y+$h);
        echo "new google.maps.LatLng($lat,$lng),";
	list($lng, $lat) = convertToMC($x,$y+$h);
        echo "new google.maps.LatLng($lat,$lng),";
	list($lng, $lat) = convertToMC($x,$y);
        echo "new google.maps.LatLng($lat,$lng),";
	echo "];";

	echo "var $name"."Region = new google.maps.Polygon({";
	echo "paths: $name"."Coords,";
	echo "strokeColor: '#FF0000',";
	echo "strokeOpacity: 0.8,";
	echo "strokeWeight: 2,";
	echo "fillColor: '#FF0000',";
	echo "fillOpacity: 0.35";
	echo "});";
	echo $name."Region.setMap(map);";
}

function drawMoongates() {
	drawRegion(1330, 1991, 13, 13, "Britain");
	drawRegion(1494, 3767, 12, 11, "Jhelom");
	drawRegion(2694, 685, 15, 16, "Minoc");
	drawRegion(1823, 2943, 11, 11, "Trinsic");
	drawRegion(761, 741, 19, 21, "Yew");
	drawRegion(638, 2062, 12, 11, "SkaraBrae");
	drawRegion(4459, 1276, 16, 16, "Moonglow");
	drawRegion(3554, 2132, 18, 18, "Magincia");
}
?>
