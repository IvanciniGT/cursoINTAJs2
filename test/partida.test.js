var assert = require('assert');
var Partida = require('../bin/partida.js');
var ahorcado = require('../bin/ahorcado.js');
var JuegoPaises = require('../bin/juegoPaises.js');
const Juego = require('../bin/juego.js');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function tests(){
    miJuego=new JuegoPaises();
    while(miJuego.estado!=Juego.ESTADO.INICIADO){
        await sleep(200);
        
        //console.log('Cargando juego');
    }

    describe('Crear partida',()=>{
        const miPartida=new Partida(miJuego);

        it('Una partida deberia iniciarse sin fallos', 
            ()=> assert.equal(miPartida.fallos , 0));
        it('Una partida deberia iniciarse con una palabra', 
            ()=> assert.ok(miPartida.palabra.length > 0));
        it('Una partida deberia iniciarse con una lista vacia de letras', 
            ()=> assert.equal(miPartida.letras.length , 0));
        it('Una partida deberia iniciarse en estado JUGANDO', 
            ()=> assert.equal(miPartida.estado,Partida.ESTADO.JUGANDO ));
        it('Una partida deberia iniciarse con la palabra totalmente enmascarada', 
            ()=> {
                var palabra=miPartida.palabra;
                var mascara=miPartida.mascara;
                assert.equal(ahorcado.enmascarar(palabra),mascara);
            });
    });

    describe('Función de nuevaLetra',()=>{
        describe('Nueva letra ok',()=>{
            const miPartida=new Partida(miJuego);

            var letra=miPartida.palabra.charAt(0);
            miPartida.nuevaLetra(letra);
            it('No incrementa fallos', 
                ()=>assert.equal(miPartida.fallos,0));
            it('Mascara contiene la letra', 
                ()=>assert.ok(miPartida.mascara.includes(letra)));
            it('En la lista de letras aparece la nueva letra', 
                ()=>assert.ok(miPartida.letras.includes(letra)));
        });
        describe('Nueva letra Nok',async()=>{
            const miPartida=new Partida(miJuego);

            var letra='€';
            miPartida.nuevaLetra(letra);
            it('Incrementa fallos', 
                ()=>assert.equal(miPartida.fallos,1));
            it('Mascara no contiene la letra', 
                ()=>assert.equal(miPartida.mascara.includes(letra),false));
            it('En la lista de letras aparece la nueva letra', 
                ()=>assert.ok(miPartida.letras.includes(letra)));
        });
    });
}
tests();