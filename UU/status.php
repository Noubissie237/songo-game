<?php

    include "bd.php";

    $id = $_GET['val'];

    if($id == 1)
        $opp = 2;
    else
        $opp = 1;

    $req = $mysqli->query("SELECT *FROM permission WHERE id=$id");

    foreach($req as $elt)
        $stat = $elt['valeur'];

    if(($id == 1 || $id == 2) && ($stat == 0))
        echo 0;
    else if(($id == 1 || $id == 2) && ($stat == 1))
    {
        // Changement de status
        $req = $mysqli->query("SELECT * FROM permission WHERE id=$opp");
        foreach($req as $elt)
            $stat1 = $elt['valeur'];

        $reqF1 = $mysqli->query("UPDATE permission SET valeur=$stat1 WHERE id='$id' ");
        $reqF2 = $mysqli->query("UPDATE permission SET valeur=$stat WHERE id='$opp' ");

        echo 1;
    }