var numberOfpro;
var newPro
window.onload = function () {
    numberOfpro = 1;
    newPro = document.getElementById("ny-prosess");
    newPro.addEventListener("click", newProsess);
}

function newProsess() {
    if (numberOfpro >= 10) {
        return;
    }

    //--------Lager selve raden + Prosessnavn:---
    var prosesses = document.getElementById("prosesses");
    var tempDiv = document.createElement('div');
    var tempId = "prosess" + numberOfpro;
    let rowClass = "row" + (numberOfpro + 1);
    tempDiv.setAttribute('class',' row ');
    tempDiv.setAttribute('id', tempId);
    var tempProsessNavn = document.createElement('span');
    tempProsessNavn.setAttribute('class', 'col1');
    tempProsessNavn.textContent = "Prosess navn" + numberOfpro;
    tempDiv.appendChild(tempProsessNavn);

    //---------Lager innput felter------------
    for (var i = 2; i < 8; i++) {
        let tempClass = "col" + i;
        let input = document.createElement('input');
        input.setAttribute('class', tempClass);
        input.setAttribute('type', 'number');
        tempDiv.appendChild(input);
    }
    //------Lager delete knapp: ----------------
    var delBtn = document.createElement('button');
    delBtn.setAttribute('id', 'delBtn' + numberOfpro);
    delBtn.setAttribute('class', 'delBtn');
    delBtn.innerHTML = "x";
    delBtn.onclick = function (event) {
        delPros(event);
    }
    tempDiv.appendChild(delBtn);
    numberOfpro++;
    prosesses.appendChild(tempDiv);

}
function delPros(event) {
    let prosDiv = document.getElementById("prosesses")
    let prosesses = prosDiv.children;
    let id = event.toElement.id[6] - 1;
    console.log(prosesses[id]);
    prosDiv.removeChild(prosesses[id]);
    uppdateProsIds(id);
    numberOfpro--;
}

function uppdateProsIds(indx) {
    let prosDiv = document.getElementById("prosesses")
    let prosesses = prosDiv.children;
    for (var i = indx; i < prosesses.length; i++) {
        let pros = prosesses[i];
        let delBtn = pros.querySelector(".delBtn");
        let newId = delBtn.id[6] - 1;
        delBtn.id = 'delBtn' + newId;
    }
    for (var i = 0; i < prosesses.length; i++) {
        let pros = prosesses[i];
        let delBtn = pros.querySelector(".delBtn");
        console.log(delBtn.id);
    }
}
