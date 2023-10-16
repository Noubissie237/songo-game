var permission;

function actu()
{
    setInterval(init, 300);
}

function init()
{
    names();
    score();

    for(let i=1; i<=14; i++)
        affiche(i);
}

function names()
{
    var xhttp = new XMLHttpRequest();

    for(let i=1; i<=2; i++)
    {
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200)
            {
                document.getElementById('jr'+i).innerHTML = this.response;
                if(this.response == 'en attente du joueur '+i)
                    document.getElementById('pjr'+i).innerHTML = '...';
                else   
                document.getElementById('pjr'+i).innerHTML = this.response;
            }
        }

        xhttp.open('GET', 'getName.php?id='+i, false);
        xhttp.send();
    }
}

function score()
{
    var xhttp = new XMLHttpRequest();

    for(let i=1; i<=2; i++)
    {
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status== 200)
                document.getElementById('pion'+i).value = this.response;
        };
        xhttp.open('GET', 'score.php?val='+i, false);
        xhttp.send();
    }
}

function affiche(id)
{
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200)
            document.getElementById(id-1).value = this.response
    };

    xhttp.open('GET', 'affiche.php?val='+id, true);
    xhttp.send();
}

function dist(id)
{
    var Plyr;
    const nbrePions = document.getElementById(id).value;
    var xhttp = new XMLHttpRequest();

    if(id<7)
        Plyr = 1;
    else
        Plyr = 2;

    if((poursuiteJeu() == 1) || (poursuiteJeu() == 2))
    {
        document.getElementById('milieu').style = "display:inline; border:0px; background-color:white; color:red; font-variant: small-caps;";
        document.getElementById('milieu').value = "Victoire du joueur "+poursuiteJeu()+" !!!";
    }
    else
    {
        if(estBloque(Plyr) && nbrePions>0)
        {
            xhttp.open('GET', 'game.php?case='+id, false);
            xhttp.send();
            poursuiteJeu();
        }
    }
}

function estBloque(idj)
{
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200)
            permission = this.response;
    }

    xhttp.open('GET', 'status.php?val='+idj, false);
    xhttp.send();

    if(permission == 1)
        return true;
    return false;
}

function poursuiteJeu()
{
    var xhttp = new XMLHttpRequest();
    var decision;

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200)
            decision = this.response;
    }

    xhttp.open('GET', 'checkJeu.php', false);
    xhttp.send();

    return decision;
}

function newPart()
{
    var xhttp = new XMLHttpRequest();

    xhttp.open('GET', 'reset.php', true);
    xhttp.send();
}

function menu()
{
    var xhttp = new XMLHttpRequest();

    xhttp.open('GET', 'menu.php', true);
    xhttp.send();
}

