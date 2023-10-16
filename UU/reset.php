<?php
    include "bd.php";

    for($i=1;$i<=7;$i++)
    {
        $req1 = $mysqli->query("UPDATE joueur1 SET nbrePions=5 WHERE idCase=$i");
        $req2 = $mysqli->query("UPDATE joueur2 SET nbrePions=5 WHERE idCase=$i");
    }

    $req3 = $mysqli->query("UPDATE permission SET valeur=1 WHERE id=1");
    $req4 = $mysqli->query("UPDATE permission SET valeur=0 WHERE id=2");

    $req5 = $mysqli->query("UPDATE score SET scores=0 WHERE id=1");
    $req6 = $mysqli->query("UPDATE score SET scores=0 WHERE id=2");