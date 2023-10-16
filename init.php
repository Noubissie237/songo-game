<?php

    $mysqli = new mysqli("localhost", "root", "", "songo");

    $nom = $_GET['nom'];

    $req = $mysqli->query("SELECT * FROM personne WHERE id=1");

    foreach($req as $elt)
        $res = $elt['nom'];

    if($res == 'en attente du joueur 1')
        $req = $mysqli->query("UPDATE personne SET nom='$nom' WHERE id=1");
    else
        $req = $mysqli->query("UPDATE personne SET nom='$nom' WHERE id=2");