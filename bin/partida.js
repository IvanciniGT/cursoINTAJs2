const ahorcado=require('./ahorcado.js');
const ESTADO={
    'JUGANDO': 0,
    'PERDIDO': 1,
    'GANADO': 2   
}
class Partida{
    constructor(juego){
        this.palabra=juego.palabraAleatoria();
        this.mascara=ahorcado.enmascarar(this.palabra);
        this.letras=[];
        this.fallos=0;
        this.estado=ESTADO.JUGANDO;
    }
    nuevaLetra(letra){
        // Meter letra en la saca
        // partida.letras=[...partida.letras,letra];
        this.letras.push(letra);
        // Mascara refrescarla
        this.mascara=ahorcado.enmascarar(this.palabra, this.letras);
        // Incrementar fallos si los hay (Comprobar si la letra existe)
        if( ! this.palabra.includes(letra))
            this.fallos++;
        // Estado de la partida
        if(this.fallos==6)
            this.estado=ESTADO.PERDIDO;
        if( ! this.mascara.includes('_'))
            this.estado=ESTADO.GANADO;
    }

    static get ESTADO(){
        return ESTADO;
    }
}
module.exports=Partida;