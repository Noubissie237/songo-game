var permission1 = false; // par defaut la machine joue en deuxieme position
var permission2 = true; // par defaut, l'humain est le premier a jouer

var dataset = {
    tab1 : [5,5,5,5,5,5,5],
    tab2 : [5,5,5,5,5,5,5],
    point1 : 0,
    point2 : 0
}

function init()
{
    for(var i=0; i<7; i++)
        document.getElementById(i).value = dataset.tab1[i];
    
    for(var j=7; j<14; j++)
        document.getElementById(j).value = dataset.tab2[j-7];

    document.getElementById('pionM').value = dataset.point1;
    document.getElementById('pionH').value = dataset.point2;
}


class Songo
{
    constructor(cj1, cj2, pt1, pt2)
    {
        this.coteJoueur1 = cj1;
        this.coteJoueur2 = cj2;
        this.pointJoueur1 = pt1;
        this.pointJoueur2 = pt2;
    }

    /*      Methode qui retourne le nombre de point(pion) du joueur idj     */

    nbpion(idj)
    {
        if(idj == 1)
            return this.pointJoueur1;
        return this.pointJoueur2;
    }

    /*      Methode qui determine si le joueur idj est bloque ou pas        */

    estBloque(idj)
    {
        if(permission1 && (idj == 1))
            return 0; // On retourne 0 pour dire qu'il n'est pas bloque
        
        else if(!permission1 && (idj == 1))
            return 1; // ON retourne 1 pour dire qu'il est bloque
        
        else if(permission2 && (idj == 2))
            return 0;
        
        else if(!permission2 && (idj == 2))
            return 1;
    }

    /*      Methode qui permet d'effectuer la distribution      */

    ditribution(idj) // l'idj represente l'id de la case d'ou l'on part ( la case qui sera cliquee )
    {
        if(this.poursuiteJeu())
        {
            if(this.poursuiteJeu() == 1)
            {
                document.getElementById('milieu').style = "display:inline; color: #f00";
                document.getElementById('milieu').value = "Vous avez perdu !!!";
            }
            else
            {
                document.getElementById('milieu').style = "display:inline; color: #0f0";
                document.getElementById('milieu').value = "Vous avez gagne !!!";
            }
            permission1 = false;
            permission2 = false;
        }
        else
        {
            if(idj >=0 && idj<=6)
            {
                var dict = {
                    6 : 7,
                    5 : 8,
                    4 : 9,
                    3 : 10,
                    2 : 11,
                    1 : 12,
                    0 : 13
                }

                if(!(this.estBloque(1) && (idj == 6)))
                {
                    if(this.coteJoueur1[idj] == 1)
                    {
                        var auto = Math.round(Math.random() * 6);
                        this.ditribution(auto);
                    }
                    else if(this.coteJoueur1[idj] == 2)
                    {
                        if(this.coteJoueur2[5] != 1 && this.coteJoueur2[5] != 2 && this.coteJoueur2[5] != 3)
                        {
                            var auto = Math.round(Math.random() * 6);
                            this.ditribution(auto);
                        }
                    }
                }
                if(!this.estBloque(1) && this.coteJoueur1[idj]>0)
                {
                    var nbrePion = this.coteJoueur1[idj];
                    this.coteJoueur1[idj] = 0;

                    for(var i=(idj+1); i<7; i++)
                    {
                        if(nbrePion > 0)
                        {
                            this.coteJoueur1[i] += 1;
                            nbrePion -= 1;
                        }
                    }

                    if(nbrePion > 0)
                    {
                        var pos = 6;
                        while((nbrePion > 0) && (pos >= 0))
                        {
                            this.coteJoueur2[pos] += 1;
                            nbrePion -= 1;
                            pos --;
                        }

                        if(!(nbrePion > 0))
                            this.prise(dict[pos+1]);
                        else
                        {
                            var i=0;
                            while((nbrePion > 0) && (i < idj))
                            {
                                this.coteJoueur1[i] += 1;
                                nbrePion --;
                                i += 1;
                            }
                            if(nbrePion > 0)
                            {
                                while(nbrePion > 0)
                                {
                                    pos = 6;
                                    for(i=6; i>=0; i--)
                                    {
                                        if(nbrePion > 0)
                                        {
                                            this.coteJoueur2[i] ++;
                                            nbrePion --;
                                            pos --;
                                        }
                                    }
                                }
                                this.prise(dict[pos+1]);
                            }
                        }
                    }
                    permission1 = false;
                    permission2 = true;
                }
                else if(!this.estBloque(1) && this.coteJoueur1[idj]==0)
                {
                    var auto = Math.round(Math.random() * 6);
                    this.ditribution(auto);
                }
            }

            if(idj >=7 && idj <= 13)
            {
                if(!(this.estBloque(2)) && (idj == 7))
                {
                    if(this.coteJoueur2[0] == 1)
                        return;
                    if(this.coteJoueur2[0] == 2)
                    {
                        if(this.coteJoueur1[1] != 1 && this.coteJoueur1[1] != 2 && this.coteJoueur1[1] != 3)
                            return;
                    }
                }

                idj -= 7;
                
                if(!this.estBloque(2) && this.coteJoueur2[idj]>0)
                {
                    var nbrePion = this.coteJoueur2[idj];
                    this.coteJoueur2[idj] = 0;

                    for(var i=(idj-1); i>=0; i--)
                    {
                        if(nbrePion > 0)
                        {
                            this.coteJoueur2[i] ++;
                            nbrePion --;
                        }
                    }
                    if(nbrePion > 0)
                    {
                        var pos = 0;
                        while((nbrePion>0) && (pos <=6))
                        {
                            this.coteJoueur1[pos] ++;
                            nbrePion --;
                            pos++;
                        }
                        
                        if(!(nbrePion > 0))
                            this.prise(pos-1);
                        else
                        {
                            var i = 6;
                            while((nbrePion > 0) && (i>idj))
                            {
                                this.coteJoueur2[i] += 1;
                                nbrePion --;
                                i--;
                            }
                            if(nbrePion > 0)
                            {
                                var progress = 0;
                                while(nbrePion > 0)
                                {
                                    pos = (progress % 7);

                                    if(nbrePion > 0)
                                    {
                                        this.coteJoueur1[pos] ++;
                                        nbrePion --;
                                        progress ++;
                                    }
                                }
                                this.prise(pos);
                            }
                        }
                    }
                    permission1 = true;
                    permission2 = false;

                    var auto = Math.round(Math.random() * 6);

                    setTimeout(function(){
                        start(auto);
                    },2000)
                }
            }
        }
    }

    /*      Methode qui permet d'effectuer une prise        */

    prise(idj) // l'idj represente l'id de la derniere case dans laquelle s'est effectuee la distribution
    {
        var check = true;
        if((idj >=0 ) && (idj <=6))
        {
            while(check)
            {
                if(this.coteJoueur1[idj] == 2 || this.coteJoueur1[idj] == 3 || this.coteJoueur1[idj] == 4)
                {
                    this.pointJoueur2 += this.coteJoueur1[idj];
                    this.coteJoueur1[idj] = 0;
                    idj -= 1;
                }
                else
                    check = false;
            }
        }
        else if((idj >=7) && (idj <= 13))
        {
            var dict = {
                7 : 6,
                8 : 5,
                9 : 4,
                10: 3,
                11: 2,
                12:1,
                13:0
            }
            while(check)
            {
                if(this.coteJoueur2[dict[idj]] == 2 || this.coteJoueur2[dict[idj]] == 3 || this.coteJoueur2[dict[idj]] == 4)
                {
                    this.pointJoueur1 += this.coteJoueur2[dict[idj]];
                    this.coteJoueur2[dict[idj]] = 0;
                    idj -= 1;
                }
                else
                    check = false;
            }
        }
    }

    /*      Methode qui determine si le jeu se poursuit ou pas  */
    
    poursuiteJeu()
    {
        var som1 = 0;
        var somT = 0;
        var som2 = 0;

        for(let i = 0; i<=6; i++)
        {
            somT += (this.coteJoueur1[i] + this.coteJoueur2[i]);
            som1 += this.coteJoueur1[i];
            som2 += this.coteJoueur2[i];
        }

        if(somT < 10)
        {
            if((this.nbpion(1) + som1) > 35)
                return 1;
            return 2;
        }

        if(this.nbpion(1) <= 35 && this.nbpion(2) <= 35)
            return 0;

        else
        {
            if(this.nbpion(1) > 35)
                return 1;
            return 2;
        }
    }
}

var S1 = new Songo(dataset.tab1, dataset.tab2, dataset.point1, dataset.point2);

function start(idj)
{
    S1.ditribution(idj);

    for(var i=0; i<7; i++)
    {
        document.getElementById(i).value = S1.coteJoueur1[i];
        document.getElementById(i+7).value = S1.coteJoueur2[i];
    }

    document.getElementById('pionM').value = S1.nbpion(1);
    document.getElementById('pionH').value = S1.nbpion(2);

}