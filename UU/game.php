<?php

    include "bd.php";

    $case = $_GET['case'];

    function getPions($joueur, $case)
    {
        include "bd.php";

        // On recupere d'abord le nombre de pions de la case clique
        $req = $mysqli->query("SELECT * FROM $joueur WHERE idCase=$case");
        
        foreach($req as $elt)
            $point = $elt['nbrePions'];

        // On vide la case en question
        $req = $mysqli->query("UPDATE $joueur SET nbrePions=0 WHERE idCase=$case");

        return $point;
    }

    function distribution($joueur, $position, $arret, $pions)
    {
        include "bd.php";

        if($joueur === 2)
        {
            while(($position >= $arret) && ($pions > 0))
            {
                $req = $mysqli->query("SELECT * FROM joueur2 WHERE idCase=$position");
                foreach($req as $elt)
                    $res = $elt['nbrePions'];

                $res += 1;
                $req = $mysqli->query("UPDATE joueur2 SET nbrePions=$res WHERE idCase=$position");

                $position -= 1;
                $pions -= 1;
            }
        }
        else
        {
            while(($position <= $arret) && ($pions > 0))
            {
                $req = $mysqli->query("SELECT * FROM joueur1 WHERE idCase=$position");
                foreach($req as $elt)
                    $res = $elt['nbrePions'];

                $res += 1;
                $req = $mysqli->query("UPDATE joueur1 SET nbrePions=$res WHERE idCase=$position");

                $position += 1;
                $pions -= 1;
            }
        }

        return [$pions, $position];
    }

    function prise($joueur, $case)
    {
        include "bd.php";

        $check = TRUE;

        if($joueur == 1)
        {
            while($check && $case>0)
            {
                $req = $mysqli->query("SELECT * FROM joueur1 WHERE idCase=$case");
                foreach($req as $elt)
                    $value = $elt['nbrePions'];

                if($value == 2 || $value == 3 || $value == 4)
                {
                    // On rempli dans les point de celui qui bouffe
                    $req = $mysqli->query("SELECT * FROM score WHERE id=2");
                    foreach($req as $elt)
                        $pts = $elt['scores'];

                    $pts += $value;
                    $req = $mysqli->query("UPDATE score SET scores=$pts WHERE id=2");

                    //On mets a zero les pions de la case ou l'on mange
                    $req = $mysqli->query("UPDATE joueur1 SET nbrePions=0 WHERE idCase=$case");

                    $case -= 1;
                }
                else
                    $check = FALSE;
            }
        }
        else
        {
            while($check && $case<8)
            {
                $req = $mysqli->query("SELECT * FROM joueur2 WHERE idCase=$case");
                foreach($req as $elt)
                    $value = $elt['nbrePions'];

                if($value == 2 || $value == 3 || $value == 4)
                {
                    $req = $mysqli->query("SELECT * FROM score WHERE id=1");
                    foreach($req as $elt)  
                        $pts = $elt['scores'];

                    $pts += $value;
                    $req = $mysqli->query("UPDATE score SET scores=$pts WHERE id=1");

                    $req = $mysqli->query("UPDATE joueur2 SET nbrePions=0 WHERE idCase=$case");

                    $case += 1;
                }
                else
                    $check = FALSE;
            }
        }
    }

    if($case>6)
    {
        $joueur = 'joueur2';
        $case -= 6;
        $posD = $case - 1;
        $posF = 1;
        $pions = getPions($joueur, $case);
        $Tab = distribution(2,$posD,$posF,$pions);
        $pions = $Tab[0];

        if($pions > 0)
        {
            // On entre dans le camps de l'adversaire
            $Tab = distribution(1,1,7,$pions);
            $pions = $Tab[0];
            if(!($pions > 0))
                prise(1, ($Tab[1]-1));

            else
            {
                // Retour dans son camps
                $Tab = distribution(2,7,($posD+2),$pions);
                if($Tab[0] > 0)
                {
                    while($Tab[0] > 0)
                        $Tab = distribution(1,1,7,$Tab[0]);
                    
                    prise(1, ($Tab[1]-1));
                }
            }
            
        }
    }
    else
    {
        $joueur = 'joueur1';
        $case += 1;
        $posD = $case + 1;
        $posF = 7;
        $pions = getPions($joueur, $case);
        $Tab = distribution(1,$posD,$posF,$pions);
        $pions = $Tab[0];

        if($pions > 0)
        {
            // On entre dans le camps de l'adversaire
            $Tab = distribution(2,7,1,$pions);
            $pions = $Tab[0];
            if(!($pions > 0))
                prise(2, ($Tab[1]+1));

            else
            {
                // Retour dans son camps
                $Tab = distribution(1,1,($posD-2),$pions);
                if($Tab[0] > 0)
                {
                    while($Tab[0] > 0)
                        $Tab = distribution(2,7,1,$Tab[0]);
                    
                    prise(2, ($Tab[1]+1));
                }
            }
            
        }
    }