/************** VARIABLES **************/

let col = 20;
let row = 20;
let boardSize = 650;
let w;
let delta = 0.65;

let nbPlayer = 0;
let colorPlayer1;
let colorPlayer2;
let colorPlayer3;
let colorPlayer4;
let colorOkay = false;

// TEST
let matriks = [[[1,0,0],[1,0,1],[0,1,1]]];
let matriks1 = [[50,1,1],[0,1,0],[1,0,0]];
let res = matrixAddition(matriks, matriks1);

//big f*cking matrix (toutes les pièces modéliser sur des matrices 5x5) BFM[piece][ligne][carré]
let BFM = [
[[0,0,0,0,0],
[0,0,0,0,0],
[0,0,1,0,0],
[0,0,0,0,0],
[0,0,0,0,0]
],
[[0,0,0,0,0],
[0,0,1,0,0],
[0,0,1,0,0],
[0,0,0,0,0],
[0,0,0,0,0]
],
[[0,0,0,0,0],
[0,0,1,0,0],
[0,0,1,0,0],
[0,0,1,0,0],
[0,0,0,0,0]
],
[[0,0,0,0,0],
[0,0,1,0,0],
[0,0,1,1,0],
[0,0,0,0,0],
[0,0,0,0,0]
],
[[0,0,0,0,0],
[0,0,1,0,0],
[0,0,1,0,0],
[0,0,1,0,0],
[0,0,1,0,0]
],
[[0,0,0,0,0],
[0,0,1,0,0],
[0,0,1,0,0],
[0,1,1,0,0],
[0,0,0,0,0]
],
[[0,0,0,0,0],
[0,0,1,0,0],
[0,0,1,1,0],
[0,0,1,0,0],
[0,0,0,0,0]
],
[[0,0,0,0,0],
[0,0,0,0,0],
[0,1,1,0,0],
[0,1,1,0,0],
[0,0,0,0,0]
],
[[0,0,0,0,0],
[0,0,0,0,0],
[0,1,1,0,0],
[0,0,1,1,0],
[0,0,0,0,0]
],
[[0,0,1,0,0],
 [0,0,1,0,0],
 [0,0,1,0,0],
 [0,0,1,0,0],
 [0,0,1,0,0]
],
[[0,0,0,0,0],
 [0,0,1,0,0],
 [0,0,1,0,0],
 [0,0,1,0,0],
 [0,1,1,0,0]
],
[[0,0,0,0,0],
 [0,0,1,0,0],
 [0,0,1,0,0],
 [0,1,1,0,0],
 [0,1,0,0,0]
],
[[0,0,0,0,0],
 [0,0,1,0,0],
 [0,1,1,0,0],
 [0,1,1,0,0],
 [0,0,0,0,0]
],
[[0,0,0,0,0],
 [0,1,1,0,0],
 [0,0,1,0,0],
 [0,1,1,0,0],
 [0,0,0,0,0]
],
[[0,0,0,0,0],
 [0,0,1,0,0],
 [0,0,1,1,0],
 [0,0,1,0,0],
 [0,0,1,0,0]
],
[[0,0,0,0,0],
 [0,0,0,0,0],
 [0,0,1,0,0],
 [0,0,1,0,0],
 [0,1,1,1,0]
],
[[0,0,1,0,0],
 [0,0,1,0,0],
 [0,0,1,1,1],
 [0,0,0,0,0],
 [0,0,0,0,0]
],
[[0,0,0,0,0],
 [0,1,1,0,0],
 [0,0,1,1,0],
 [0,0,0,1,0],
 [0,0,0,0,0]
],
[[0,0,0,0,0],
 [0,1,0,0,0],
 [0,1,1,1,0],
 [0,0,0,1,0],
 [0,0,0,0,0]
],
[[0,0,0,0,0],
 [0,1,0,0,0],
 [0,1,1,1,0],
 [0,0,1,0,0],
 [0,0,0,0,0]
],
[[0,0,0,0,0],
 [0,0,1,0,0],
 [0,1,1,1,0],
 [0,0,1,0,0],
 [0,0,0,0,0]
]
];
/************** PRELOAD **************/

function preload(){

}
/************** SETUP **************/

function setup(){
    createCanvas(1349,boardSize);
    background(200,200,200);
    $("#J1").colorPick({
       'initialColor': '#ff0000',
       'onColorSelected':function(){
            this.element.css('background-color',this.color);
            colorPlayer1 = this.color;
        }
    });
    $("#J2").colorPick({
        'initialColor': '#00ff00',
        'onColorSelected':function(){
            this.element.css('background-color',this.color);
            colorPlayer2 = this.color;
        }
    });
    $("#J3").colorPick({
        'initialColor': '#0000ff',
        'onColorSelected':function(){
            this.element.css('background-color',this.color);
            colorPlayer3 = this.color;
        }
    });
    $("#J4").colorPick({
        'initialColor': '#ffff00',
        'onColorSelected':function(){
            this.element.css('background-color',this.color);
            colorPlayer4 = this.color;
        }
    });
}

/************** BOUCLE INFINIE **************/
function draw(){
    if(nbPlayer != 2 && nbPlayer != 4){ //check du nombre de joueurs, influe sur le plateau et les couleurs
        nbPlayer = floor(Number(window.prompt("Entrez le nombre de joueurs (2 ou 4)", 4)));
        window.alert("Selectionnez votre couleur pour chaque joueur puis validez");
    }else if(nbPlayer == 2){
        $("#J3").remove(); // Si 2 joueurs,
        $("#J4").remove(); // joueur3 et joueur4 sont supprimé
        col = 14;
        row = 14;
        w = (boardSize/col);
        cases = tableau2D(row, col);
        stroke(0);
        noFill();        
        for(let j = 0; j < row; j++){     //dessin du plateau de jeu 2 joueurs
            for(let i = 0; i < col; i++){
                cases[i][j] = [0];
                square(j*w, i*w, w);
                /*textSize(32);
                text("1", j*w, i*w);*/
            }
        }
        fill(colorPlayer1);
        square(0,(col-1)*w,w);
        line(0, (col-1)*w, w, col*w);
        fill(colorPlayer2);
        square((col-1)*w,0,w);
        line((col-1)*w, 0, col*w, w);

        initPieces(BFM);
    }else{
        stroke(0);
        noFill();
        w = boardSize/col;
        cases = tableau2D(row, col);
        for(let j = 0; j < row; j++){     //dessin du plateau de jeu 4 joueurs
            for(let i = 0; i < col; i++){
                cases[i][j] = [0];
                square(j*w, i*w, w);
            }
        }
        fill(colorPlayer1);
        square(0,(col-1)*w,w);
        line(0, (col-1)*w, w, col*w);

        fill(colorPlayer2);
        square(0,0,w);
        line(0, 0, w, w);

        fill(colorPlayer3);
        square((col-1)*w,0,w);
        line((col-1)*w, 0, col*w, w);

        fill(colorPlayer4);
        square((col-1)*w,(col-1)*w,w);
        line((col-1)*w, (col-1)*w, col*w, col*w);

        initPieces(BFM);
    }
}

/************** FONCTIONS **************/

//creer un tableau 2D
function tableau2D(rows, cols){
    var arr = new Array(rows);
    for(i = 0; i < arr.length; i++){
        arr[i] = new Array(cols);
    }
    return arr;
}

//une fois la couleur choisie, enleve les div permettant la selection des couleurs.
function couleurChoisie(){
    $("#J1").remove();
    $("#J2").remove();
    $("#J3").remove();
    $("#container").remove();
    $("#container").remove(); //Doublon pour régler le problème de suppression de div
    colorOkay = true; //Tant que colorOkay est false, le jeu ne commence pas
}

//empeche d'avoir 2 fois la meme couleur #### NON UTILISE POUR L'INSTANT ####
function checkColor(call){
    let list = [colorPlayer1, colorPlayer2, colorPlayer3, colorPlayer4];
    let count = 0;
    for(i=0; i<4; i++){
        if(list[i] == call){
            count++;
        }
    }
    if(count != 1){
        alert("un autre joueur possède déjà cette couleur, mettez vous d'accord");
    }
}

//permet d'additionner 2 matrices
function matrixAddition(a, b) {
    var res = [];
    a.forEach((t, n) => {
      res.push(t.reduce((sums, val, i) => sums.concat(val + b[n][i]), []));
    });
    return res;
}

//initialise l'affichage de toutes les pièces
function initPieces(matrice){
    translate(boardSize,0);
    fill(255,200,200);
    let ret = w*delta;
    for(x=0;x<matrice.length;x++){
        push();
        for(y=0; y<matrice[x].length; y++){
            push();
            for(z=0;z<matrice[x][y].length; z++){
                if(matrice[x][y][z]){
                    fill(255);
                    stroke(0);
                    square(0, 0, ret);
                }/*else{
                    fill(255,0,0);
                    square(0,0,ret);
                }*/
                translate(ret,0);
            }
            pop();
            translate(0,ret);
        }
        pop();
        if(x == 3 || x == 7 || x == 11 || x == 15 || x == 19){
            translate(-20*ret,5*ret);
        }
        translate(5*ret,0);
    }    

}

function drawPieces(matrice){

}