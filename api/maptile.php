<?php
if (!function_exists('getallheaders'))
{
	function getallheaders()
	{
		$headers = '';
		foreach ($_SERVER as $name => $value)
		{
			if (substr($name, 0, 5) == 'HTTP_')
			{
				$headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
			}
		}
		return $headers;
	}
}



$x = intval($_GET["x"]);
$y = intval($_GET["y"]);
$z = intval($_GET["z"]);
$map = intval($_GET["map"]);

if($map == null)
	$map = 0;

$map_select = '';

if($map == 0)
{
	$map_select = 'felucca';
}else if ($map == 1)
{
	$map_select = 'trammel';
}else if ($map == 2)
{
	$map_select = 'ilshenar';
}else if ($map == 3)
{
	$map_select = 'malas';
}else if ($map == 4)
{
	$map_select = 'tokuno';
}else if ($map == 5)
{
	$map_select = 'termur';
}

if(!is_numeric($x)||!is_numeric($y)|!is_numeric($z))
	return;

$cache_root = "./map/cache/" . $map_select;
$cache_dir =  $cache_root . "/" . $z . "/" . $x;
$cache = $cache_dir . "/" . $y . ".png";

if(!file_exists($cache_dir)) {
	mkdir($cache_dir, 0777, true);
}

if(!file_exists($cache)) {
	$tileX = 208;
	$tileY = 208;

	$img = imagecreatefrompng("../img/" . $map_select . ".png");
	$resized = imagecreatetruecolor($tileX, $tileY);
        
        $mapSize = 0;

        if($map == 0 || $map == 1)
        {
            $mapSize = 6;
        }elseif ($map == 2 || $map == 3) {
            $mapSize = 4;
        }elseif ( $map == 4) {
            $mapSize = 3;
        }elseif ( $map == 5) {
            $mapSize = 4;
        }    
        
	if($z <= $mapSize)
		imagecopyresized($resized, $img, 0, 0, $x * ($tileX << ($mapSize-$z)), $y * ($tileY << ($mapSize-$z)), $tileX, $tileY, $tileX << ($mapSize-$z), $tileY << ($mapSize-$z));
	else
		imagecopyresized($resized, $img, 0, 0, $x * ($tileX >> ($z-$mapSize)), $y * ($tileY >> ($z-$mapSize)), $tileX, $tileY, $tileX >> ($z-$mapSize), $tileY >> ($z-$mapSize));
	imagepng($resized, $cache);
}

$headers = getallheaders();

if (isset($headers['If-Modified-Since']) && (strtotime($headers['If-Modified-Since']) == filemtime($cache))) {
  header("Last-Modified: " . gmdate('D, d M Y H:i:s', filemtime($cache)) . " GMT", true, 304);
} else {
  header("Last-Modified: " . gmdate('D, d M Y H:i:s', filemtime($cache)) . " GMT", true, 200);
  header("Content-Length: " . filesize($cache));
  header("Content-Type: image/png");
  $fp = fopen($cache, 'rb');
  fpassthru($fp);
}

//header("Content-Type: image/png");
//header("Content-Length: " . filesize($cache));
//$fp = fopen($cache, 'rb');
//fpassthru($fp);
?>
