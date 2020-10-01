function enmascarar(palabra, letrasSinEnmascarar=[] ){
    return [...palabra]     // Para cada letra
        .map(letra=>{       // Transformarla en
            if(letrasSinEnmascarar.includes(letra) ) // Si me pasan la letra
                return letra;   // Dejo La misma letra
            return '_';         // Un guion en caso contrario
        })    
        .join(' ');         // Junto las letras
    
//    return [...palabra].map(letra => letrasSinEnmascarar.includes(letra) ? letra : '_').join(' ');
}

module.exports = {enmascarar};