<?php
$tileX = 320;
$tileY = 256;

$img = imagecreatefrompng("/home/zenvera/public_html/img/facet-cropped-edgeclean.png");

$cache_root = "/home/zenvera/public_html/map2/cache_test";

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
   if($z <= 4)
    imagecopyresized($resized, $img, 0, 0, $x * ($tileX << (4-$z)), $y * ($tileY << (4-$z)), $tileX, $tileY, $tileX << (4-$z), $tileY << (4-$z));
   else
    imagecopyresized($resized, $img, 0, 0, $x * ($tileX >> ($z-4)), $y * ($tileY >> ($z-4)), $tileX, $tileY, $tileX >> ($z-4), $tileY >> ($z-4));
   imagepng($resized, $cache);
  }
 }
}
?>
