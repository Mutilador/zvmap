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
?>
