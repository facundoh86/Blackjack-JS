/*
    2C = Two of Clubs
    2D = Two of Diamonds
    2H = Two of Hearts
    2S = Two of Spaces

*/

let deck         = [];
const tipos      = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador     = 0;
let puntosComputadora = 0;


// Referencias HTML

const btnPedir          = document.querySelector('#btnPedir');
const puntosHTML        = document.querySelectorAll('small');
const jugadorCartas     = document.querySelector('#jugadorCartas');
const computadoracartas = document.querySelector('#computadoraCartas');

const crearDeck = () => {

    for ( let i = 2; i <= 10; i++ ){
        for( let tipo of tipos ){
            deck.push( i + tipo );
        }
    }
    for ( let tipo of tipos){
        for( let esp of especiales ){
            deck.push( esp + tipo );
        }
    }

    // console.log(deck);
    deck = _.shuffle( deck );
    console.log(deck);

    return deck;
};

crearDeck();

const pedirCarta = () => {

    if( deck.length === 0 ) {
        throw new Error('No hay mas cartas en el deck');
    }

    const carta =  deck.pop();

    return carta;

};


const valorCarta = ( carta ) => {

    const valor = carta.substring(0, carta.length -1);

    return ( isNaN(valor) ) ?
        (valor === 'A') ? 11 : 10
        : valor * 1;

};


// Eventos

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta( carta );
    puntosHTML[0].innerText = puntosJugador;

    // <!-- <img  class="carta" src="assets/cartas/10C.png"> -->

    const imgCarta = document.createElement('img');
    imgCarta.src   = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    jugadorCartas.append(imgCarta);

    if(puntosJugador > 21){
        console.warn('Perdio');
        btnPedir.disabled = true;
    } else if (puntosJugador === 21 ){
        console.log('21, Genial!');
        btnPedir.disabled = true;
    }

});

