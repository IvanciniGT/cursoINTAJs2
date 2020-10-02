function enmascarar(palabra, letrasSinEnmascarar=[] ){
    //              'Espáña',    [E,N, A] =>>  E _ _ á ñ a
    return preparar(palabra)     // Para cada pareja de letras
        .map( ([letraOriginal, letraParaComparar])  =>{            // Transformarla en
            if(letrasSinEnmascarar.includes(letraParaComparar) ) // Si me pasan la letra
                return letraOriginal;    // Dejo La misma letra
            return '_';          // Un guion en caso contrario
        })    
        .join(' ');         // Junto las letras
    
//    return [...palabra].map(letra => letrasSinEnmascarar.includes(letra) ? letra : '_').join(' ');
}

function preparar(palabra){
    return [...palabra].map(   letra   =>   [ letra  ,  prepararLetra(letra) ]   
    );
 }

function prepararLetra(letra){
    return letra.normalize('NFD')
                .toUpperCase()
                .replace(/[\u0300-\u036f]/g,"");
}
module.exports = {enmascarar,prepararLetra};