var maksAntallPros = 10;
var antallPros = 0;
var prosesser = [];
var oppsumering = true;
var antallKriterier = 6;
var kriterieVekter = [1.3,1.4,1.2,1.1,1.3,1.2];

window.onload = function(){
    leggTilProsess("Test");
    document.getElementById("addProsBtn").onclick = function(){
        let newProsName = document.getElementById("nyttProsessNavn").value;
        if(newProsName ==""){
                alert("Prossesnavn er påkrevd");
                document.getElementById("nyttProsessNavn").focus();
        }
        else{
            leggTilProsess(newProsName);
        }
    }
    document.getElementById("changeViewBtn").onclick = changeView;

    let kriterier = document.getElementsByClassName("kriterie");
    for(var i = 0; i< kriterier.length;i++){
        kriterier[i].onclick = function(event){
            redigerKriterie(event);
        }
    }
}

function leggTilProsess(prosessNavn){
    if(antallPros>=maksAntallPros){
        alert("Maks antall prosesser er 10");
        return;
    }
    let prosContainer = document.getElementById("p-container");
    antallPros++;
    let nyPros = document.createElement("div");

    nyPros.setAttribute('class','row innrow');
    nyPros.setAttribute('id',prosessNavn);
    let name = document.createElement("span");
    name.setAttribute('style','grid-column:1/2;');
    name.innerHTML = prosessNavn;
    nyPros.appendChild(name);
    for(var i = 1; i<antallKriterier+1; i++){
        let inputFelt = document.createElement('input');
        inputFelt.setAttribute('type','number');
        inputFelt.setAttribute('style','grid-column:'+ (i+1)+"/"+(i+2));
        nyPros.appendChild(inputFelt);
    }
    let slettKnapp = document.createElement("button");
    slettKnapp.innerHTML = "x";
    slettKnapp.onclick = function(event){
        slettPros(event);
    }
    nyPros.appendChild(slettKnapp);
    prosesser.push(nyPros);
    prosContainer.appendChild(nyPros);
}

function slettPros(event){
    prosContainer = document.getElementById("p-container");
    prosContainer.removeChild(event.path[1]);
    antallPros--;
}

function redigerKriterie(event){
    console.log(event);

}

function changeView(){
    if(!oppsumering){
        seVurderingsside();
    }
    else{
        seOppsumering();
    }
    oppsumering = !oppsumering;
}

function seOppsumering(){
    let kriterieOversikt = document.getElementById("kriterieOversikt");
    let prosContainer = document.getElementById("p-container");
    let addProsBtn = document.getElementById("addProsBtn");
    let nyttProsessNavn = document.getElementById("nyttProsessNavn");
    let changeViewBtn = document.getElementById("changeViewBtn");
    let oppsummeringHeader= document.getElementById('oppsummeringHeader');
    console.log(oppsummeringHeader);
    changeViewBtn.innerHTML = "Tilbake";
    addProsBtn.setAttribute("style", "display:none");
    nyttProsessNavn.setAttribute("style", "display:none");
    kriterieOversikt.setAttribute("style", "display:none");
    oppsummeringHeader.setAttribute("style", "display:grid");
    prosContainer.setAttribute("style", "display:none");
    lagOppsumering();
}

function seVurderingsside(){
    let kriterieOversikt = document.getElementById("kriterieOversikt");
    let prosContainer = document.getElementById("p-container");
    let addProsBtn = document.getElementById("addProsBtn");
    let nyttProsessNavn = document.getElementById("nyttProsessNavn");
    let changeViewBtn = document.getElementById("changeViewBtn");
    let oppsummeringHeader= document.getElementById('oppsummeringHeader');
    oppsummeringHeader.setAttribute("style", "display:none");
    changeViewBtn.innerHTML = "oppsumering";
    addProsBtn.setAttribute("style", "display:grid");
    nyttProsessNavn.setAttribute("style", "grid-column:1/4");
    kriterieOversikt.setAttribute("style", "display:grid");
    prosContainer.setAttribute("style", "display:grid");
}

function lagOppsumering(){
    let pContainer = document.getElementById("p-container");
    let prosesser = pContainer.children;
    let prosessNavn = [];
    let prosessResultater = [];
    for(var i=0; i < prosesser.length; i++){
        prosessNavn.push(prosesser[i].id);
        let inputFelt = prosesser[i].children;
        let resultatFraEn = [];
        for(let j = 1; j<antallKriterier+1; j++){
            resultatFraEn.push(inputFelt[j].value);
        }
        prosessResultater.push(resultatFraEn);
    }
    let vektedeResultater = [];
    for(var i=0; i < prosesser.length; i++){
        let etVektetResultat = 0;
        for(let j = 0; j<antallKriterier; j++){
            etVektetResultat += prosessResultater[i][j]*kriterieVekter[j];
        }
        vektedeResultater.push(etVektetResultat);

    }
    let sorterteVektedeResultater = vektedeResultater.slice().sort(compare);

    initTabel(sorterteVektedeResultater,vektedeResultater,prosessNavn);

}

function initTabel(sorterteVektedeResultater,vektedeResultater,prosessNavn){
    $("#r-container").empty();
    let resultatTabell ="<table><tr><th colspan =2>Resultater</th></tr><tr><th>Prosessnavn</th><th>Score</th></tr>";
    for(var i = 0; i < prosessNavn.length; i++){
        let tr = "<tr><td>"+prosessNavn[vektedeResultater.indexOf(sorterteVektedeResultater[i])]+
        "<td><td>"+sorterteVektedeResultater[i]+"</td></tr>";
        resultatTabell+=tr;
    }

    resultatTabell += "</table>";
    $("#r-container").append(resultatTabell);
}



function compare(a, b) {
  if (a>b) {
    return -1;
  }
  if (a<b) {
    return 1;
  }
  // a must be equal to b
  return 0;
}
