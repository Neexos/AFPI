/************** VARIABLES **************/

let col = 20;
let row = 20;
let boardSize = 500;
let w = boardSize/col;
let nbPlayer;
let colorPlayer;
/************** PRELOAD **************/

function preload(){
    
}
/************** SETUP **************/

function setup(){
    createCanvas(1600,1200);
    background(200,200,200);
    cases = tableau2D(row, col);
    stroke(0);
    noFill();
   // nbPlayer = floor(window.prompt("Entrez le nombre de joueurs (1 à 4)", 2));
   // selectedColor = window.prompt();

   $(".picker").colorPick({
       'onColorSelected':function(){
            this.element.css({'backgroundcolor':this.color,'color':this.color});
            $(".container").css({'backgroundcolor':this.color,'color':this.color});
            $(".playerColor").css({'backgroundcolor':this.color,'color':this.color});
            colorPlayer = this.color;
        }
   });


    translate((width-boardSize)/2,(height-boardSize)/2);
    for(let j = 0; j < row; j++){     //dessin du plateau de jeu
        for(let i = 0; i < col; i++){
            cases[i][j] = [i, j];
            square(j*w, i*w, w);
        }
    }
    fill(255,0,0);
    square(19*w,0,w);
    fill(0,0,255);
    square(0,0,w);
    fill(255,255,0);
    square(19*w,19*w,w);
    

}

/************** BOUCLE INFINI **************/
function draw(){
    translate((width-boardSize)/2,(height-boardSize)/2);
    fill(0,0,255);
    //square(0,0,w);
    fill(colorPlayer);
    square(0,19*w,w);

}

/************** FONCTIONS **************/
function tableau2D(rows, cols){
    var arr = new Array(rows);
    for(i = 0; i < arr.length; i++){
        arr[i] = new Array(cols);
    }
    return arr;
}