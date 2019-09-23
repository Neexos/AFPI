/************** VARIABLES **************/

let col = 20;
let row = 20;
let cases;
let boardSize = 650;
let w;
let delta = 0.8;

let nbPlayer = 0;
let colorPlayer1;
let colorPlayer2;
let colorPlayer3;
let colorPlayer4;
let colorOkay = false;

let piecesJ1;
let piecesJ2;
let piecesJ3;
let piecesJ4;

let currPlayerMatrix;

let pieceSelected = 0;

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
[[0,0,1,0,0],
[0,0,1,0,0],
[0,0,1,0,0],
[0,0,1,0,0],
[0,0,0,0,0]
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
[[0,0,0,0,0],
 [0,0,1,0,0],
 [0,0,1,0,0],
 [0,0,1,1,1],
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

let tour = 1;
/************** PRELOAD **************/

function preload(){
    piecesJ1 = BFM;
    piecesJ2 = BFM;
    piecesJ3 = BFM;
    piecesJ4 = BFM;
}
/************** SETUP **************/

function setup(){
    createCanvas(1349,boardSize);
    $("#J1").colorPick({
       'initialColor': '#0000ff',
       'onColorSelected':function(){
            this.element.css('background-color',this.color);
            colorPlayer1 = this.color;
        }
    });
    $("#J2").colorPick({
        'initialColor': '#ffff00',
        'onColorSelected':function(){
            this.element.css('background-color',this.color);
            colorPlayer2 = this.color;
        }
    });
    $("#J3").colorPick({
        'initialColor': '#ff0000',
        'onColorSelected':function(){
            this.element.css('background-color',this.color);
            colorPlayer3 = this.color;
        }
    });
    $("#J4").colorPick({
        'initialColor': '#00ff00',
        'onColorSelected':function(){
            this.element.css('background-color',this.color);
            colorPlayer4 = this.color;
        }
    });
}

/************** BOUCLE INFINIE **************/
function draw(){
    background(200,200,200);
    if(nbPlayer != 2 && nbPlayer != 4){ //check du nombre de joueurs, influe sur le plateau et les couleurs
        nbPlayer = floor(Number(window.prompt("Entrez le nombre de joueurs (2 ou 4)", 4)));
        window.alert("Selectionnez votre couleur pour chaque joueur puis validez");
    }else if(nbPlayer == 2){
        $("#J3").remove(); // Si 2 joueurs,
        $("#J4").remove(); // joueur3 et joueur4 sont supprimé
        col = 14;
        row = 14;
        w = (boardSize/col);
        delta = 0.55;                       //reduction de la taille des piece pour 2 joueurs (sinon pb affichage)
        stroke(0);
        noFill();        
        for(let j = 0; j < row; j++){     //dessin du plateau de jeu 2 joueurs
            for(let i = 0; i < col; i++){
                square(j*w, i*w, w);
            }
        }
        fill(colorPlayer1);
        square(0,(col-1)*w,w);
        line(0, (col-1)*w, w, col*w);
        fill(colorPlayer2);
        square((col-1)*w,0,w);
        line((col-1)*w, 0, col*w, w);

        if(colorOkay){
            initPieces(BFM,colorPlayer1);
        }
        if(mouseIsPressed){
            if(mouseX>boardSize && mouseX<boardSize+5*(w*delta) && mouseY>0 && mouseY<5*(w*delta) && pieceSelected == 0){ //pièce 1x1
                pieceSelected = 1;
            }
            if(mouseX>boardSize+5*(w*delta) && mouseX<boardSize+10*(w*delta) && mouseY>0 && mouseY<5*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 2;
            }
            if(mouseX>boardSize+10*(w*delta) && mouseX<boardSize+15*(w*delta) && mouseY>0 && mouseY<5*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 3;
            }
            if(mouseX>boardSize+15*(w*delta) && mouseX<boardSize+20*(w*delta) && mouseY>0 && mouseY<5*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 4;
            }
            if(mouseX>boardSize+20*(w*delta) && mouseX<boardSize+25*(w*delta) && mouseY>0 && mouseY<5*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 5;
            }
            if(mouseX>boardSize && mouseX<boardSize+5*(w*delta) && mouseY>5*(w*delta) && mouseY<10*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 6;
            }
            if(mouseX>boardSize+5*(w*delta) && mouseX<boardSize+10*(w*delta) && mouseY>5*(w*delta) && mouseY<10*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 7;
            }
            if(mouseX>boardSize+10*(w*delta) && mouseX<boardSize+15*(w*delta) && mouseY>5*(w*delta) && mouseY<10*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 8;
            }
            if(mouseX>boardSize+15*(w*delta) && mouseX<boardSize+20*(w*delta) && mouseY>5*(w*delta) && mouseY<10*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 9;
            }
            if(mouseX>boardSize+20*(w*delta) && mouseX<boardSize+25*(w*delta) && mouseY>5*(w*delta) && mouseY<10*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 10;
            }
            if(mouseX>boardSize && mouseX<boardSize+5*(w*delta) && mouseY>10*(w*delta) && mouseY<15*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 11;
            }
            if(mouseX>boardSize+5*(w*delta) && mouseX<boardSize+10*(w*delta) && mouseY>10*(w*delta) && mouseY<15*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 12;
            }
            if(mouseX>boardSize+10*(w*delta) && mouseX<boardSize+15*(w*delta) && mouseY>10*(w*delta) && mouseY<15*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 13;
            }
            if(mouseX>boardSize+15*(w*delta) && mouseX<boardSize+20*(w*delta) && mouseY>10*(w*delta) && mouseY<15*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 14;
            }
            if(mouseX>boardSize+20*(w*delta) && mouseX<boardSize+25*(w*delta) && mouseY>10*(w*delta) && mouseY<15*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 15;
            }
            if(mouseX>boardSize && mouseX<boardSize+5*(w*delta) && mouseY>15*(w*delta) && mouseY<20*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 16;
            }
            if(mouseX>boardSize+5*(w*delta) && mouseX<boardSize+10*(w*delta) && mouseY>15*(w*delta) && mouseY<20*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 17;
            }
            if(mouseX>boardSize+10*(w*delta) && mouseX<boardSize+15*(w*delta) && mouseY>15*(w*delta) && mouseY<20*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 18;
            }
            if(mouseX>boardSize+15*(w*delta) && mouseX<boardSize+20*(w*delta) && mouseY>15*(w*delta) && mouseY<20*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 19;
            }
            if(mouseX>boardSize+20*(w*delta) && mouseX<boardSize+25*(w*delta) && mouseY>15*(w*delta) && mouseY<20*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 20;
            }
            if(mouseX>boardSize && mouseX<boardSize+5*(w*delta) && mouseY>20*(w*delta) && mouseY<25*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 21;
            }
            if(pieceSelected){
                selectPiece(pieceSelected-1, piecesJ1, colorPlayer1);
            }
        }
    }else{
        stroke(0);
        noFill();
        w = boardSize/col;
        for(let j = 0; j < row; j++){     //dessin du plateau de jeu 4 joueurs
            for(let i = 0; i < col; i++){
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

        if(colorOkay){
            initPieces(BFM,colorPlayer1);
        }
        //selection de la piece lors du clic. 
        //TODO: factoriser !!! c'est degueulasse
        if(mouseIsPressed){
            if(mouseX>boardSize && mouseX<boardSize+5*(w*delta) && mouseY>0 && mouseY<5*(w*delta) && pieceSelected == 0){ //pièce 1x1
                pieceSelected = 1;
            }
            if(mouseX>boardSize+5*(w*delta) && mouseX<boardSize+10*(w*delta) && mouseY>0 && mouseY<5*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 2;
            }
            if(mouseX>boardSize+10*(w*delta) && mouseX<boardSize+15*(w*delta) && mouseY>0 && mouseY<5*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 3;
            }
            if(mouseX>boardSize+15*(w*delta) && mouseX<boardSize+20*(w*delta) && mouseY>0 && mouseY<5*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 4;
            }
            if(mouseX>boardSize+20*(w*delta) && mouseX<boardSize+25*(w*delta) && mouseY>0 && mouseY<5*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 5;
            }
            if(mouseX>boardSize && mouseX<boardSize+5*(w*delta) && mouseY>5*(w*delta) && mouseY<10*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 6;
            }
            if(mouseX>boardSize+5*(w*delta) && mouseX<boardSize+10*(w*delta) && mouseY>5*(w*delta) && mouseY<10*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 7;
            }
            if(mouseX>boardSize+10*(w*delta) && mouseX<boardSize+15*(w*delta) && mouseY>5*(w*delta) && mouseY<10*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 8;
            }
            if(mouseX>boardSize+15*(w*delta) && mouseX<boardSize+20*(w*delta) && mouseY>5*(w*delta) && mouseY<10*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 9;
            }
            if(mouseX>boardSize+20*(w*delta) && mouseX<boardSize+25*(w*delta) && mouseY>5*(w*delta) && mouseY<10*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 10;
            }
            if(mouseX>boardSize && mouseX<boardSize+5*(w*delta) && mouseY>10*(w*delta) && mouseY<15*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 11;
            }
            if(mouseX>boardSize+5*(w*delta) && mouseX<boardSize+10*(w*delta) && mouseY>10*(w*delta) && mouseY<15*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 12;
            }
            if(mouseX>boardSize+10*(w*delta) && mouseX<boardSize+15*(w*delta) && mouseY>10*(w*delta) && mouseY<15*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 13;
            }
            if(mouseX>boardSize+15*(w*delta) && mouseX<boardSize+20*(w*delta) && mouseY>10*(w*delta) && mouseY<15*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 14;
            }
            if(mouseX>boardSize+20*(w*delta) && mouseX<boardSize+25*(w*delta) && mouseY>10*(w*delta) && mouseY<15*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 15;
            }
            if(mouseX>boardSize && mouseX<boardSize+5*(w*delta) && mouseY>15*(w*delta) && mouseY<20*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 16;
            }
            if(mouseX>boardSize+5*(w*delta) && mouseX<boardSize+10*(w*delta) && mouseY>15*(w*delta) && mouseY<20*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 17;
            }
            if(mouseX>boardSize+10*(w*delta) && mouseX<boardSize+15*(w*delta) && mouseY>15*(w*delta) && mouseY<20*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 18;
            }
            if(mouseX>boardSize+15*(w*delta) && mouseX<boardSize+20*(w*delta) && mouseY>15*(w*delta) && mouseY<20*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 19;
            }
            if(mouseX>boardSize+20*(w*delta) && mouseX<boardSize+25*(w*delta) && mouseY>15*(w*delta) && mouseY<20*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 20;
            }
            if(mouseX>boardSize && mouseX<boardSize+5*(w*delta) && mouseY>20*(w*delta) && mouseY<25*(w*delta) && pieceSelected == 0){ 
                pieceSelected = 21;
            }
            if(pieceSelected){
                selectPiece(pieceSelected-1, piecesJ1, colorPlayer1);
            }
        }
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
function validate(){
    if(checkColor([colorPlayer1, colorPlayer2, colorPlayer3, colorPlayer4])){ //si les joueurs ont sélectionné des couleurs différentes on passe à la suite
        $("#J1").remove();
        $("#J2").remove();
        $("#J3").remove();
        $("#container").remove();
        $("#container").remove(); //Doublon pour régler le problème de suppression de div
        colorOkay = true; //Tant que colorOkay est false, le jeu ne commence pas
        cases = tableau2D(row, col);
        for(let j = 0; j < row; j++){     //dessin du plateau de jeu 2 joueurs
            for(let i = 0; i < col; i++){
                cases[j][i] = 0;
            }
        }
    }else{ //si deux joueurs ont la meme couleur on les previens et on attend qu'ils refassent un choix
        alert("Deux joueurs possèdent la même couleur, mettez-vous d'accord !");
    }
}

//empeche d'avoir 2 fois la meme couleur
let testUnique;
function checkColor(liste){
    testUnique = doublon(liste);
    if(testUnique.length != 4){
        return false;
    }
    return true;
}
function doublon(array){
    return $.grep(array,function(el,index){
        return index == $.inArray(el,array);
    });
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
function initPieces(matrice, color){
    translate(boardSize,0); //on se deplace vers la doite afin de dessiner les pièces a cote du plateau
    let dim = w*delta; //réduction de la taille des pièces par rapport à la taille des cases (opti de la place)
    for(x=0;x<matrice.length;x++){
        push();
        for(y=0; y<matrice[x].length; y++){
            push();
            for(z=0;z<matrice[x][y].length; z++){
                if(matrice[x][y][z]){
                    fill(color);
                    stroke(0);
                    square(0, 0, dim);
                }
                /*else{ //decommenter pour test
                    fill(255,0,0);
                    square(0,0,dim);
                }*/
                translate(dim,0); //deplacement en x après chaque dessin d'un carre d'une piece
            }
            pop();
            translate(0,dim); //deplacement en y apres la fin d'une ligne d'une piece (matrice 5x5)
        }
        pop();
        if(x == 4 || x == 9 || x == 14 || x == 19){
            translate(-25*dim,5*dim); //retour à la ligne après affichage de 5 pièces
        }
        translate(5*dim,0);
    }    

}

function selectPiece(pieceId, matrice, color){
    let piece = matrice[pieceId];
    resetMatrix();
    translate(-2.5*w,-2.5*w);
    for(x=0; x<piece.length; x++){
        push();
        for(y=0;y<piece[x].length; y++){
            if(piece[x][y] && x == 2 && y == 2){
                fill(color);
                stroke(0);
                square(mouseX, mouseY, w);
            }else if(piece[x][y]){
                fill(color);
                stroke(0);
                square(mouseX, mouseY, w);
            }
            else{ //decommenter pour test
                fill(255,0,0);
                square(mouseX,mouseY,w);
            }
            translate(w,0); //deplacement en x après chaque dessin d'un carre d'une piece
        }
        pop();
        translate(0,w); //deplacement en y apres la fin d'une ligne d'une piece (matrice 5x5)
    }
}

// deselectionne la piece une fois le clic relache
function mouseReleased(){
    // TODO: verif possibilite du move
    if(mouseX>0 && mouseX<boardSize && mouseY>0 && mouseY<boardSize && pieceSelected){
        checkMove(mouseX, mouseY, pieceSelected);
    }
    pieceSelected = 0;
}
// selon la touche pressee, fais tourner la piece dans un sens donne
function keyPressed(){
    if(pieceSelected){
        if(keyCode === RIGHT_ARROW){
            rotation(piecesJ1[pieceSelected-1], 1);
        }
        else if(keyCode === LEFT_ARROW){
            rotation(piecesJ1[pieceSelected-1], 2);
        }
        else if (keyCode === UP_ARROW || keyCode === DOWN_ARROW){
            rotation(piecesJ1[pieceSelected-1], 3);
        }
    }
    if(key === "h"){
        alert("Résumé des commandes:\n\t- Restez appuyé ");
    }
}

// tourne la piece dans un sens defini
function rotation(piece, angle){
    // Copie de la matrice originale
    var origMatrix = piece.slice();
    if(angle === 1){
        for(var i=0; i < piece.length; i++) {
            // Map chaque ligne a sa valeur tournee de 90°
            var row = piece[i].map(function(x, j) {
                var k = (piece.length - 1) - j;
                return origMatrix[k][i];
            });
            piece[i] = row;
        }
        return piece;
    }
    else if(angle === 2){
        let N = piece[0].length;
        let temp; 
        for(x=0; x<N/2; x++){         
            for(y=x; y<N-x-1; y++){
                temp = piece[x][y];
                // move values from right to top 
                piece[x][y] = piece[y][N-1-x];
                // move values from bottom to right 
                piece[y][N-1-x] = piece[N-1-x][N-1-y]; 
                // move values from left to bottom 
                piece[N-1-x][N-1-y] = piece[N-1-y][x];
                // assign temp to left 
                piece[N-1-y][x] = temp;
            }
        }
    }
    else if(angle === 3){
        for(var i=0; i < piece.length; i++) {
            // Map chaque ligne a sa valeur tournee de 90°
            var row = piece[i].map(function(x, j) {
                var k = (piece.length - 1) - j;
                return origMatrix[k][i];
            });
            piece[piece.length-(i+1)] = row;
        }
        return piece;
    }
}

//verifie que la piece peut etre posee a cet endroit
function checkMove(posX, posY, piece){
    print(posX, posY, piece); //OK
    let coord = getCase(posX, posY);
    if(cases[coord[1]][coord[0]]){ //cases[x][y] = 0 si libre, 1 si J1, 2 si J2 etc.
        alert("T'es con ou quoi ? Tu vois pas qu'il y a déjà une pièce ?");
    }else{
        print('la case est libre');
        for(x=0; x< BFM[piece-1].length; x++){
            for(y=0;y< BFM[piece-1][x].length; y++){
                if( BFM[piece-1][x][y] === 1){
                    print(x,y);
                }
            }
        }
    }
}
//retourne les coordonnees de la case sur laquelle la piece est relachee
function getCase(x, y){
    return [floor(x/w), floor(y/w)];
}