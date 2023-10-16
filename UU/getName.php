<?php
    include "bd.php";

    $id = $_GET['id'];

    $req = $mysqli->query("SELECT * FROM personne WHERE id=$id");

    foreach($req as $elt)
        $res = $elt['nom'];

    echo $res;