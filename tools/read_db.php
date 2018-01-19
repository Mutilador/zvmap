<?php
	
	function getJsonPlayers()
	{
		require_once '../includes/Mongodb/vendor/autoload.php';

		$client = new MongoDB\Client("mongodb://localhost:27017");

		$collection = $client->ultimaphp->players;

		$cursor = $collection->find();

		$json = [];

		foreach ($cursor as $test)
		{
			$id = $test['_id'];
			$name = $test['name'];
			$x = $test['position']['x'];
			$y = $test['position']['y'];
			$z = $test['position']['z'];
			$map = $test['position']['map'];	
			
			$json[] = ["id"=>$id,"name"=>$name,"x"=>$x,"y"=>$y,"z"=>$z,"map"=>$map];
			
		}

		$fp = fopen('players.json','w');
		fwrite($fp, json_encode($json));
		fclose($fp);
		
	}
	getJsonPlayers();
?>