const Juego = require('./juego.js');

class JuegoPaises extends Juego{

    constructor(){
        super();
    }

    nombreFichero(){
        return './resources/paises.txt';
    }

}

module.exports=JuegoPaises;