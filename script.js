let accueil = document.getElementById("accueil");
let jeu = document.getElementById("jeu");
let fin = document.getElementById("fin");
let boutonJouer = document.getElementById("jouer");
let boutonRegles = document.getElementById("regles");
let boutonRejouer = document.getElementById("encore");
let boutonAccueil = document.querySelectorAll(".stop");
let cases = document.querySelectorAll(".case");
let joueur1;
let joueur2;
let joueurActuel;
let grille = ["", "", "", "", "", "", "", "", ""];
let combinaisonsGagnantes = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]  
];
let fini = false;
let winner = document.getElementById("fin").querySelector("h3");


boutonRegles.addEventListener("click", function(){
    alert("Règles du jeu: Pour jouer au morpion, il faut tracer une Grille de 3 Cases sur 3 et aligner 3 symboles identiques (généralement X et O) horizontalement, verticalement ou en diagonale. Les joueurs inscrivent tour à tour leur symbole sur les Cases . Le Jeu se joue en 3 manches. Le Joueur qui réussit à aligner ses trois symboles gagne la partie");
});

boutonAccueil.forEach(function(stop) {
    stop.addEventListener("click", function() {
    accueil.classList.remove("cacher");
    jeu.classList.add("cacher");
    fin.classList.add("cacher");
    });
});

boutonRejouer.addEventListener("click", function(){
    
    fin.classList.add("cacher");
    jeu.classList.remove("cacher");
    resetGrille();
});

function resetGrille(){

    grille = ["", "", "", "", "", "", "", "", ""];
    cases.forEach(function(maCase){
        let caseVide = maCase.querySelector("p");
        caseVide.innerText = "";
    });

    fini = false;
    joueur1 = { nom: prompt("Joueur 1, comment tu t'appelles ?"), symbole: "X" };
    joueur2 = { nom: prompt("Joueur 2, comment tu t'appelles ?"), symbole: "O" };
    joueurActuel = joueur1;

    fin.classList.add("cacher");
    jeu.classList.remove("cacher");

    
}
function verifierGagnant() {
    for (let i = 0; i < combinaisonsGagnantes.length; i++) {
        let combinaison = combinaisonsGagnantes[i];
        let a = combinaison[0];
        let b = combinaison[1];
        let c = combinaison[2];

        if (grille[a] !== "" && grille[a] === grille[b] && grille[a] === grille[c]) {

            winner.innerText = joueurActuel.nom + " a gagné !";
            
            jeu.classList.add("cacher");
            fin.classList.remove("cacher");

            fini = true;
            return;
        }
    }

    let toutesRemplies = true;
    for (let j = 0; j < grille.length; j++) {
        if (grille[j] <9 ) {
            toutesRemplies = false;
            break; 
        }
    }

    if (toutesRemplies) {
        winner.innerText = "Match nul !";
        jeu.classList.add("cacher");
        fin.classList.remove("cacher");
        fini = true;
    }
}

boutonJouer.addEventListener("click", function() {
    resetGrille();
    joueur1 = { nom: prompt("Joueur 1, comment tu t'appelles ?"), symbole: "X" };
    joueur2 = { nom: prompt("Joueur 2, comment tu t'appelles ?"), symbole: "O" };
    joueurActuel = joueur1;
    let affichageTour = document.querySelector(".joueur");
    function mettreAJourTour() {
        affichageTour.innerText = joueurActuel.nom; 
    }
    mettreAJourTour();

    accueil.classList.add("cacher");
    jeu.classList.remove("cacher");

    cases.forEach(function(maCase,index) {
        maCase.addEventListener("click", function() {
            let caseVide = maCase.querySelector("p");

            if (caseVide.innerText !== "") {
                alert("Choisissez une case vide !");
                return;
            }

            caseVide.innerText = joueurActuel.symbole;
            grille[index] = joueurActuel.symbole;
            
            verifierGagnant();
            
            if (joueurActuel === joueur1) {
                joueurActuel = joueur2;
            } else {
                joueurActuel = joueur1;
            }


                console.log(grille);
            
            
            mettreAJourTour();
        });
    });
});
