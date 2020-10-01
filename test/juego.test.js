var assert = require('assert');
var JuegoPaises = require('../bin/juegoPaises.js');
var Juego = require('../bin/juego.js');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Palabra aleatoria',()=>{
    it('Me da palabras aleatorias dentro de la lista',
        async() =>{
            miJuego=new JuegoPaises();
            while(miJuego.estado!=Juego.ESTADO.INICIADO){
                await sleep(200);
                //console.log('Cargando juego');
            }
            total=20;

            listaFiltrada=[...new Array(total).keys()]
                .map( test => miJuego.palabraAleatoria())
                .filter( palabra => miJuego.listaPalabras.includes(palabra));
                assert.equal(total,listaFiltrada.length);
                assert.ok([...new Set(listaFiltrada)].length>1);
        }
    );
 });

 