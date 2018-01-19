<?php
$tileX = 208;
$tileY = 208;

$img = imagecreatefrompng("./img/MAP0-1.png");

$cache_root = "./map/cache_test";

for($z=0; $z <= 7; $z++) {
 $range = 1 << $z;
 for($x=0; $x < $range; $x++) {
  $cache_dir =  $cache_root . "/" . $z . "/" . $x;
  if(!file_exists($cache_dir)) {
   mkdir($cache_dir, 0777, true);
  }
  for($y=0; $y < $range; $y++) {
   $cache = $cache_dir . "/" . $y . ".png";
   $resized = imagecreatetruecolor($tileX, $tileY);
   if($z <= 5)
    imagecopyresized($resized, $img, 0, 0, $x * ($tileX << (5-$z)), $y * ($tileY << (5-$z)), $tileX, $tileY, $tileX << (5-$z), $tileY << (5-$z));
   else
    imagecopyresized($resized, $img, 0, 0, $x * ($tileX >> ($z-5)), $y * ($tileY >> ($z-5)), $tileX, $tileY, $tileX >> ($z-5), $tileY >> ($z-5));
   imagepng($resized, $cache);
  }
 }
}
?>
