(() => {
    'use strict'

    let deck         = [];
    const tipos      = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    // Referencias HTML
    const btnNuevo          = document.querySelector('#btnNuevo'),
          btnPedir          = document.querySelector('#btnPedir'),
          btnDetener        = document.querySelector('#btnDetener');

    const puntosHTML          = document.querySelectorAll('small'),
          divCartasJugadores  = document.querySelectorAll('.divCartas');

    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();

        for(let i = 0 ; i < numJugadores; i++){
            puntosJugadores.push(0);
        }

    };

    const crearDeck = () => {
        deck = [];
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
        return _.shuffle( deck );
    };

    const pedirCarta = () => {

        if( deck.length === 0 ) {
            throw new Error('No hay mas cartas en el deck');
        }

        return deck.pop();
    };


    const valorCarta = ( carta ) => {
        const valor = carta.substring(0, carta.length -1);

        return ( isNaN(valor) ) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;

    };

    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = ( carta, turno ) => {
        const imgCarta = document.createElement('img');
        imgCarta.src   = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const turnoComputadora = ( puntosMinimos ) => {

        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos( carta, puntosJugadores.length - 1 );
            crearCarta( carta, puntosJugadores.length - 1 );

            if(puntosMinimos > 21){
                break;
            }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));


        setTimeout(() => {

            if(puntosComputadora === puntosMinimos){
                alert('Nadie Gana')
            } else if (puntosMinimos > 21){
                alert('Computadora Gana')
            } else if (puntosComputadora > 21){
                alert('Jugador  Gana')
            } else if(puntosComputadora > puntosMinimos) {
                alert('Computadora Gana')
            }
        }, 30);
    }


    // Eventos

    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos( carta, 0 );
        crearCarta(carta, 0);

        if(puntosJugador > 21){
            console.warn('Perdio');
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
        } else if (puntosJugador === 21 ){
            console.log('21, Genial!');
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
        }

    });

    btnDetener.addEventListener('click', () => {

        btnPedir.disabled   = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);

    });

    btnNuevo.addEventListener('click', () => {

        inicializarJuego();
        // deck = [];
        // deck = crearDeck();

        // btnPedir.disabled   = false;
        // btnDetener.disabled = false;


        // // puntosComputadora = 0;
        // // puntosJugador     = 0;

        // puntosHTML[0].innerText     = 0;
        // puntosHTML[1].innerText     = 0;

        // jugadorCartas.innerHTML     = '';
        // computadoraCartas.innerHTML = '';
    })

})();

