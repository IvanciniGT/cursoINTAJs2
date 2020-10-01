const fs = require('fs');

const ESTADO={
    'INICIANDO': 0,
    'INICIADO': 1
}    
class Juego{
    constructor(){
        this.estado=ESTADO.INICIANDO;
        this.listaPalabras=[];
        // Leer el fichero: this.nombreFichero()
        this.leerFichero(this.nombreFichero());
    }
    nombreFichero(){
        throw new Error('Esta clase es abstracta... No implementa ningún juego.');
    }
    static get ESTADO(){
        return ESTADO;
    }
    leerFichero(fichero){
        fs.readFile( fichero, {'encoding': 'UTF-8'},(err, data) => {
            if (err) throw err;
            this.listaPalabras=data.split('\n').map(frase=>frase.trim());
            this.estado=ESTADO.INICIADO;
            //this.listaPalabras.forEach(console.log);
        });
    }

    palabraAleatoria(){
        return this.listaPalabras[ parseInt(Math.random()*this.listaPalabras.length) ];
    }
}

module.exports=Juego;