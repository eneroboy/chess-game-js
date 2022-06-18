document.addEventListener('dragstart', ev => {
    if(ev.target.className == "szach") {
        ev.dataTransfer.setData("text", ev.target.id);
    }
    
    kolumny = ["A","B","C","D","E","F","G","H"];
    document.querySelectorAll("div[class^='col'] > div[class^='row']").forEach(pole =>{pole.classList.remove("podpowiedz"); pole.classList.remove("zbij");});

    if (ev.path.length > 6){
        document.querySelectorAll("div[class^='col'] > div[class^='row']").forEach(pole =>{pole.classList.remove("podpowiedz"); pole.classList.remove("zbij");});
        pozycja = [ev.path[1].parentElement.className[3],ev.path[1].className[3]];
        xPionka = kolumny.indexOf(pozycja[0]);
        yPionka = pozycja[1];

        polaSzachownicy = document.querySelectorAll("div[class^='col'] > div[class^='row']");

        polaSzachownicy.forEach(pole => {
            pozycjaPola = [kolumny.indexOf(pole.parentElement.classList[0][3]),pole.classList[0][3]];
            xPola = pozycjaPola[0];
            yPola = pozycjaPola[1];
            odlegoscX = (xPola-xPionka)**2;
            odlegoscY = (yPola-yPionka)**2;

            kolorFigury = ev.target.id.split('_')[0];
            //console.log(pole.children);
            kolorFiguryDoZbicia = pole.children.length == 1 ? pole.children[0].id.split('_')[0] : "";
            function podpowiedz(){
                if(pole.children.length == 1 && pozycja != pozycjaPola && kolorFigury != kolorFiguryDoZbicia){
                    pole.classList.add("zbij");
                    pole.children[0].classList.add("zbij");
                } else {
                    pole.classList.add("podpowiedz");
                }
            }
            
            if (ev.target.id.indexOf("knight") > -1){
                if ((odlegoscX + odlegoscY) == 5){
                    podpowiedz();
                }
            }

            if (ev.target.id.indexOf("king") > -1){
                if ((odlegoscX + odlegoscY) < 3){
                    podpowiedz();
                }
            }

            if (ev.target.id.indexOf("bishop") > -1){
                if (odlegoscX == odlegoscY){
                    podpowiedz();
                }
            }

            if (ev.target.id.indexOf("rook") > -1){
                if (!(odlegoscX) ^ !(odlegoscY)){
                    podpowiedz();
                }
            }
            
            if (ev.target.id.indexOf("queen") > -1){
                if ( !(!(odlegoscX) ^ !(odlegoscY)) ^ ( (odlegoscX) != (odlegoscY)) ){
                    podpowiedz();
                }
            }

            if (ev.target.id.indexOf("pawn") > -1){
                if ( odlegoscX < 2 &&  ((yPola-yPionka) == (ev.target.id.indexOf("white") == -1 ? -1 : 1))){
                    if(pole.children.length == 1 && pozycja != pozycjaPola && kolorFigury != kolorFiguryDoZbicia && (xPola != parseInt(xPionka) && yPola != yPionka + parseInt(ev.target.id.indexOf("white") == -1 ? -1 : 1))){
                        pole.classList.add("zbij");
                        pole.children[0].classList.add("zbij");
                        console.log();
                    } else if (!(xPola != parseInt(xPionka) && yPola != yPionka + parseInt(ev.target.id.indexOf("white") == -1 ? -1 : 1))) {
                        pole.classList.add("podpowiedz");
                    }
                }
                // } else {
                //     if (ev.target.id.indexOf("pawn") > -1){
                //         document.querySelector("div.col"+kolumny[xPionka]+" > div.row"+(parseInt(yPionka)+(ev.target.id.indexOf("white") == -1 ? -1 : 1))).classList.add(cos = pole.children.length == 1 && pozycja != pozycjaPola && kolorFigury != kolorFiguryDoZbicia ? "podpowiedz": "podpowiedz");
                //     }
                //}
            }
        });

    } else {
        document.querySelectorAll("div[class^='col'] > div[class^='row']").forEach(pole =>{
            pozycjaPola = [kolumny.indexOf(pole.parentElement.classList[0][3]),pole.classList[0][3]];
            console.log(pozycjaPola[0]);
            if(!ev.target.id.indexOf("white") && pozycjaPola[1] <= 2){
                pole.classList.add("podpowiedz");
            } else if (!ev.target.id.indexOf("black") && pozycjaPola[1] >= 7) {
                pole.classList.add("podpowiedz");
            }
        });
    }
    
    //console.log(ev.path);
    console.log("teraz");
});

document.addEventListener('dragover', ev => {ev.preventDefault();
    //console.log("now");
});

document.addEventListener('drop', drop = ev =>{
    var e = ev.target;
    ev.preventDefault();
    //console.log(e);
    var data = ev.dataTransfer.getData("text");
    //console.log(data);
    //e.appendChild(document.getElementById(data));
    element = document.getElementById(data);
    color = data.split('_')[0];
    type = data.split('_')[1];
    number_of = data.split('_')[2];

    function wstaw(){
        document.querySelectorAll("div[class^='col'] > div[class^='row']").forEach(pole =>{
            pole.classList.remove("podpowiedz");
            pole.classList.remove("zbij");
        });
        document.querySelectorAll(".szach").forEach(szach => {
            szach.classList.remove("zbij");
        })
        e.appendChild(document.getElementById(data));          
    }

    if (data.indexOf("pawn") > -1 && e.classList[2] == "podpowiedz") {
        wstaw();              
    } else if (data.indexOf("rook") > -1 && e.classList[2] == "podpowiedz"){
        wstaw();
    } else if (data.indexOf("knight") > -1 && e.classList[2] == "podpowiedz"){
        wstaw();
    } else if (data.indexOf("king") > -1 && e.classList[2] == "podpowiedz"){
        wstaw();
    } else if (data.indexOf("bishop") > -1 && e.classList[2] == "podpowiedz"){
        wstaw();
    } else if (data.indexOf("queen") > -1 && e.classList[2] == "podpowiedz"){
        wstaw();
    } 
    
    function zbij(){
        document.querySelectorAll("div[class^='col'] > div[class^='row']").forEach(pole =>{
            pole.classList.remove("podpowiedz");
            pole.classList.remove("zbij");
        });
        document.querySelectorAll(".szach").forEach(szach => {
            szach.classList.remove("zbij");
        })
        
        if(e.classList.contains("szach")) {
            console.log(e);
            e.parentElement.appendChild(document.getElementById(data));
            e.parentElement.removeChild(e.parentElement.firstChild);
        } else {
            e.removeChild(e.firstChild);
            e.appendChild(document.getElementById(data));
        }
        //console.log(e.firstChild);
        
    }
    //console.log(e.classList);

    if (data.indexOf("pawn") > -1 && e.classList.contains("zbij")) {
        zbij();              
    } else if (data.indexOf("rook") > -1 && e.classList.contains("zbij")){
        zbij();
    } else if (data.indexOf("knight") > -1 && e.classList.contains("zbij")){
        zbij();
    } else if (data.indexOf("king") > -1 && e.classList.contains("zbij")){
        zbij();
    } else if (data.indexOf("bishop") > -1 && e.classList.contains("zbij")){
        zbij();
    } else if (data.indexOf("queen") > -1 && e.classList.contains("zbij")){
        zbij();
    } 
    //e.appendChild(document.getElementById(data));

});