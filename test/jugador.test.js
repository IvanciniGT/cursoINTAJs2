var assert = require('assert');
var Partida = require('../bin/partida.js');
var ahorcado = require('../bin/ahorcado.js');
var JuegoPaises = require('../bin/juegoPaises.js');
const Juego = require('../bin/juego.js');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function tests(){
    var nuevoJuego=new JuegoPaises();
    while(nuevoJuego.estado!=Juego.ESTADO.INICIADO){
        await sleep(200);
        
        //console.log('Cargando juego');
    }

    describe('Ganar una partida',()=>{
        var jugador={
            'nombre': 'Ivan', 
            'partidas':{
                'totales': 5,
                'ganadas': 2
            }
        };
        const miPartida=new Partida(nuevoJuego, jugador);
        [...miPartida.palabra].forEach((letra)=>miPartida.nuevaLetra(letra));
//        [...miPartida.palabra].forEach(miPartida.nuevaLetra);
        it('He ganado la partida', 
            ()=> assert.equal(miPartida.estado,Partida.ESTADO.GANADO ));
        it('El jugado tiene el total de partidas incrementadas', 
            ()=> assert.equal(jugador.partidas.totales,6 ));
        it('El jugado tiene las partidas ganadas incrementadas', 
            ()=> assert.equal(jugador.partidas.ganadas,3 ));
    });

    describe('Perder una partida',()=>{
        var perdedor={
            'nombre': 'Ivan', 
            'partidas':{
                'totales': 5,
                'ganadas': 2
            }
        };
        const miPartida=new Partida(nuevoJuego, perdedor);
        [...(new Array(7)).keys()].forEach(letra=>miPartida.nuevaLetra(''+letra));
        it('He perdido la partida', 
            ()=> assert.equal(miPartida.estado,Partida.ESTADO.PERDIDO ));
        it('El jugado tiene el total de partidas incrementadas', 
            ()=> assert.equal(perdedor.partidas.totales,6 ));
        it('El jugado tiene las partidas ganadas igual', 
            ()=> assert.equal(perdedor.partidas.ganadas,2 ));
    });
}
tests();