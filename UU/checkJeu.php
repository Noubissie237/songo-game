<?php

    include "bd.php";

    $tabPoint1 = [];
    $tabPoint2 = [];
    $tabScore = [];

    $req1 = $mysqli->query("SELECT * FROM joueur1");
    $req2 = $mysqli->query("SELECT * FROM joueur2");
    $req3 = $mysqli->query("SELECT * FROM score");

    foreach($req1 as $elt1)
    {
        $tmp = $elt1['nbrePions'];
        array_push($tabPoint1, $tmp);
    }

    foreach($req2 as $elt2)
    {
        $tmp = $elt2['nbrePions'];
        array_push($tabPoint2, $tmp);
    }

    foreach($req3 as $elt3)
    {
        $tmp = $elt3['scores'];
        array_push($tabScore, $tmp);
    }

    if(array_sum(array_merge($tabPoint1, $tabPoint2)) < 10)
    {
        $req = $mysqli->query("UPDATE permission SET valeur=0 WHERE id=1");
        $req = $mysqli->query("UPDATE permission SET valeur=0 WHERE id=2");

        if((array_sum($tabPoint1) + $tabScore[0]) > 35)
            echo 1;
        else
            echo 2;
    }

    else if($tabScore[0]>35 || $tabScore[1]> 35)
    {
        $req = $mysqli->query("UPDATE permission SET valeur=0 WHERE id=1");
        $req = $mysqli->query("UPDATE permission SET valeur=0 WHERE id=2");

        if($tabScore[0] > 35)
            echo 1;
        else
            echo 2;
    }

    else if($tabScore[0]<=35 || $tabScore[1]<= 35)
        echo 0;