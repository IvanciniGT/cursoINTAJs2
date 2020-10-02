
const readline = require('readline');
const Partida = require('./partida');
const Juego = require('./juego');
const JuegoPaises = require('./juegoPaises');

consola = readline.createInterface({
    input : process.stdin,
    output : process.stdout 
 });

 function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function leer(mensaje) {
    return new Promise(resolve => consola.question(mensaje, respuesta => resolve(respuesta.trim())))
}

async function main(){
    ///////////
    // Aqui va mi juego!!
    ///////////
    // 0- Arranco el juego de forma asincrona
        var miJuego=new JuegoPaises();
    // 1- Bienvenida
        var bienvenida=
            ' ____  _     ____  ____  ____  ____  ____  ____ \n'+
            '/  _ \\/ \\ /|/  _ \\/  __\\/   _\\/  _ \\/  _ \\/  _ \\\n'+
            '| / \\|| |_||| / \\||  \\/||  /  | / \\|| | \\|| / \\|\n'+
            '| |-||| | ||| \\_/||    /|  \\_ | |-||| |_/|| \\_/|\n'+
            '\\_/ \\|\\_/ \\|\\____/\\_/\\_\\\\____/\\_/ \\|\\____/\\____/';
        console.log('Bienvenido al juego del ...');
        console.log(bienvenida);
    // 2- Nombre
        var nombre=await leer('Para continuar, deme su nombre: ');
        // Creo el jugador
        var jugador={
            'nombre': nombre, 
            'partidas':{
                'totales': 0,
                'ganadas': 0
            }
        };
        // Espero a que el juego haya cargado
        while(miJuego.estado!=Juego.ESTADO.INICIADO)
            await sleep(200);

        var miPartida=new Partida(miJuego, jugador);
    // 4- Jugar pidiendo letras
        while(miPartida.estado==Partida.ESTADO.JUGANDO){
            console.log('\n');
            console.log('Palabra a adivinar: '+miPartida.mascara);
            console.log('  Letras que has utilizado: '+miPartida.letras);
            console.log('  Fallos: '+miPartida.fallos);
            var letra=await leer('Dame una letra: ');
            miPartida.nuevaLetra(letra);
        }
    // 5- Mostrar resultado del juego
        console.log('La palabra era: '+miPartida.palabra);
        if(miPartida.estado==Partida.ESTADO.GANADO)
            console.log('GANASTE!!!');
        else
            console.log('Perdiste!!!');
        ///////////
    consola.close();
}
main();