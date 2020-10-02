const ahorcado=require('./ahorcado.js');
const ESTADO={
    'JUGANDO': 0,
    'PERDIDO': 1,
    'GANADO': 2   
}

class Partida{
    constructor(juego, jugador={
                            'nombre': 'Desconocido', 
                            'partidas':{
                                'totales': 0,
                                'ganadas': 0
                            }
    }){
        this.palabra=juego.palabraAleatoria();
        this.mascara=ahorcado.enmascarar(this.palabra);
        this.letras=[];
        this.fallos=0;
        this.estado=ESTADO.JUGANDO;
        this.jugador=jugador;
        this.jugador.partidas.totales++;
    }
    nuevaLetra(letra){
        if(this.estado!=ESTADO.JUGANDO || this.letras.includes(ahorcado.prepararLetra(letra)))
            return;
        // Meter letra en la saca
        // partida.letras=[...partida.letras,letra];
        this.letras.push(ahorcado.prepararLetra(letra));
        // Mascara refrescarla
        var nuevaMascara=ahorcado.enmascarar(this.palabra, this.letras);
        // Incrementar fallos si los hay (Comprobar si la letra existe)
        if( nuevaMascara==this.mascara)
            this.fallos++;
        this.mascara=nuevaMascara;
        // Estado de la partida
        if(this.fallos==6)
            this.estado=ESTADO.PERDIDO;
        if( ! this.mascara.includes('_')){
            this.estado=ESTADO.GANADO;
            this.jugador.partidas.ganadas++;
        }
    }

    static get ESTADO(){
        return ESTADO;
    }
}
module.exports=Partida;