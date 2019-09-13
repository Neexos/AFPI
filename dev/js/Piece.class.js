class Piece {

    constructor(color, nbSquare, id) {
        this.couleur = color;
        this.nbSquare = nbSquare;
        this.id = id;
    }

    show(){
        fill(this.couleur);
        stroke();
    }

    create(nbSquare){
        switch (nbSquare) {
            case 1:
                
                break;
            case 2:

                break;
            case 3:
                
                break;
            case 4:

                break;
            case 5:
                                
                break;

            default:
                break;
        }
    }

    select(id){
        
    }

    rotate(sens, id){

    }

    place(pos, id){
        
    }
}