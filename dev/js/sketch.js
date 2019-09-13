/************** VARIABLES **************/

let col = 20;
let row = 20;
let boardSize = 500;
let w;
let nbPlayer = 0;
let colorPlayer1;
let colorPlayer2;
let colorPlayer3;
let colorPlayer4;
/************** PRELOAD **************/

function preload(){
    
}
/************** SETUP **************/

function setup(){
    createCanvas(1349,700);
    background(200,200,200);
    //nbPlayer = floor(window.prompt("Entrez le nombre de joueurs (2 ou 4)", 2));  
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

/************** BOUCLE INFINI **************/
function draw(){
    if(nbPlayer != 2 && nbPlayer != 4){ //check du nombre de joueurs, influe sur le plateau et les couleurs
        nbPlayer = floor(Number(window.prompt("Entrez le nombre de joueurs (2 ou 4)", 2)));
    }else if(nbPlayer == 2){
        $("#J3").remove(); // Si 2 joueurs,
        $("#J4").remove(); // joueur3 et joueur4 sont supprimé
        col = 14;
        row = 14;
        w = boardSize/col;
        cases = tableau2D(row, col);
        stroke(0);
        noFill();
        translate((width-boardSize)/2,(height-boardSize)/2);
        
        for(let j = 0; j < row; j++){     //dessin du plateau de jeu 2 joueurs
            for(let i = 0; i < col; i++){
                cases[i][j] = [i, j];
                square(j*w, i*w, w);
            }
        }
        fill(colorPlayer1);
        square(0,(col-1)*w,w);
        fill(255);
        line(0, (col-1)+w, (col-1)*w, w);
        fill(colorPlayer2);
        square((col-1)*w,0,w);
        
    }else{
        stroke(0);
        noFill();
        w = boardSize/col;
        translate((width-boardSize)/2,(height-boardSize)/2);
        cases = tableau2D(row, col);
        for(let j = 0; j < row; j++){     //dessin du plateau de jeu 4 joueurs
            for(let i = 0; i < col; i++){
                cases[i][j] = [i, j];
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
    }

}

/************** FONCTIONS **************/
function tableau2D(rows, cols){
    var arr = new Array(rows);
    for(i = 0; i < arr.length; i++){
        arr[i] = new Array(cols);
    }
    return arr;
}
// TODO : Problème de remove de container (il faut appuyer 2 fois) 
function couleurChoisie(){
    $("#J1").remove();
    $("#J2").remove();
    $("#J3").remove();
    $("#container").remove();
}