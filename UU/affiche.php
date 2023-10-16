<?php
    include "bd.php";

    $val = $_GET['val'];

    if($val <= 7)
        $player = 'joueur1';
    else
    {
        $val = $val - 7;
        $player = 'joueur2';
    }

    $req = $mysqli->query("SELECT * FROM $player WHERE idCase=$val");

    foreach($req as $elt)
        echo $elt['nbrePions'];