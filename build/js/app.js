// <<<<<<<< GALERIA >>>>>>>> 

document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){ 
    crearGaleria();
    scrollNav();
}

function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e){
            e.preventDefault(); //Prevenimos que se mueva rapido a la seccion

            // Configuramos el comportamiento
            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior: "smooth"});
        })
    })

}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');
    
    for(let i = 1; i <= 12; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <!-- La etiqueta <img> siempre sera el que se muestra, asi que si el navegador lee el avif ese sera el que se mostrara en la etiqueta img. 
            Usamos el width en 200 y height en 300 para que ligthhouse de una buena puntuacion pero igual desde css lo acomodamos para que no afecte el diseño -->
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
        `;

        imagen.onclick = function(){
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}

function mostrarImagen (id){
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <!-- La etiqueta <img> siempre sera el que se muestra, asi que si el navegador lee el avif ese sera el que se mostrara en la etiqueta img. 
        Usamos el width en 200 y height en 300 para que ligthhouse de una buena puntuacion pero igual desde css lo acomodamos para que no afecte el diseño -->
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">
    `;

    // Crear el overlay de la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function(){
        // Eliminamos la clase que deja fijo la pantalla para ver la imagen
        const body = document.querySelector('body')
        body.classList.remove('fijar-body');

        // Eliminamos el overlay
        overlay.remove();
    }

    // Boton para cerrar el modal
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function(){
        // Eliminamos la clase que deja fijo la pantalla para ver la imagen
        const body = document.querySelector('body')
        body.classList.remove('fijar-body');

        // Eliminamos el overlay
        overlay.remove();
    }
    overlay.appendChild(cerrarModal)

    // Añadir al HMTL
    const body = document.querySelector('body')
    body.appendChild(overlay);
    //Añadimos la clase que fija el body para que no se pueda scrolear mientras este abierta la imagen
    body.classList.add('fijar-body'); 
}
