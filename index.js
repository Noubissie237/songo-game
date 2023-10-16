function newUser()
{
    document.getElementById('cacher').style = "display:inline-block"; // pour permettre a l'user d'entrer son nom
    document.getElementById('bout').style = "background-color: rgba(22,72,211,03"; // pour colorier le block selectionne
    document.getElementById('cacher1').style = "display:none"; // pour cacher le bout non selectionne
}

function insert()
{
    var nom = document.getElementById('nom').value;
    var xhttp = new XMLHttpRequest();

    xhttp.open('GET', 'init.php?nom='+nom, true);
    xhttp.send();
}