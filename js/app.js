//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets')
let tweets = [];
// eventListeners

eventListeners();

function eventListeners(){
    // cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);
    // cuandp el documento esta listo
    document.addEventListener('DOMContentLoaded',()=>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        
    });
}



// funciones
function agregarTweet(e) {
    e.preventDefault();
    // textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;
    // validacion
    if (tweet === '') {
        mostrarError('Un mensaje no puede ir vacio');
        return;//evita que se ejecuten mas lineas de codigo
    };

    const tweetObj = {
        id: Date.now(),
       tweet // esto equivale a tweet: tweet
    }

    // añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];
    // una vez agregado crear el html
    crearHTML();
    // reiniciar el formulario
    formulario.reset();
};


// mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);
    // elimina la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
};

// muestra un listado de los tweets
function crearHTML(){

    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            // Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';
            // añadir la funcion de eliminar
            btnEliminar.onclick = ()=>{
                borrarTweet(tweet.id);
            }
            // crear el html
            const li = document.createElement('li');
            //añadir el texto
            li.innerText = tweet.tweet;
            // asignar el boton
            li.appendChild(btnEliminar)
            // insertarlo en el html
            listaTweets.appendChild(li);
        })
    }

    sincronizarStorage();
};

// limpiar el HTML
function limpiarHTML(){
    while (listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function borrarTweet(id){
    // elimina un tweet
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}
// agrega los tweets actuales al storage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}