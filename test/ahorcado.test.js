var assert = require('assert');
var ahorcado = require('../bin/ahorcado.js');

//it('Deberia devolver 4 si sumo 2 y 2', () => assert.equal( 2+2 ,4 ) );
describe('Función de enmascarar',()=>{
    it('Deberia enmascarar Hola como "_ _ _ _" ', 
        () => assert.equal( '_ _ _ _' , ahorcado.enmascarar('Hola') ) );
    it('Deberia enmascarar Hola como "_ o _ a", si tengo las letras: a,o,m ', 
        () => assert.equal( '_ o _ a' , ahorcado.enmascarar('Hola',['a','o','m']) ) );
});
