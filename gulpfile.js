const {src, dest, watch, parallel} = require("gulp"); //Mandamos llamar a gulp (el que instalamos en el packaje.json), el require es una forma de extraerlo // Extraemos el source y destino de gulp, watch para observar cambios y parallel para ejecutar en paralelo

//CSS
const sass = require("gulp-sass")(require("sass")); //Importamos sass, con la ayuda del conector que es gulp sass.
const plumber = require("gulp-plumber"); //Extraemos la variable de plumber.
const autoprefixer = require('autoprefixer'); //Se asegure que funcione en el navegador que tu le digas, en caso que no tenga soporte autoprefixer se encarga de eso.
const cssnano = require('cssnano'); //Comprime el codigo.
const postcss = require('gulp-postcss'); //Hace algunas transformaciones por medio de estos dos.
const sourcemaps = require('gulp-sourcemaps'); //Nos permite ver en el navegador la ubicacion de el codigo css

//IMAGEN
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// JAVASCRIPT
const terser = require('gulp-terser-js');

function css(done){
    src("src/scss/**/*.scss") // Idenfitica todas las carpetas que esten dentro de scss y todos los archivos con esa extension
        .pipe(sourcemaps.init()) //Iniciamos el map para ir guardando las referencias
        .pipe( plumber() )
        .pipe( sass() ) // Compilarla
        .pipe( postcss([ autoprefixer(), cssnano() ]))
        .pipe(sourcemaps.write('.')) //Con el punto lo guardamos en la misma ubicacion de css
        .pipe( dest("build/css"))  // Almacenar en el destino
        //Los pipes son acciones

    done(); // Callback que avisa cuando llegamos al final
}

function imagenes(done){
    // Las imagenes las vamos a optimizar a un nivel de 3 utilizando imagemin
    const opciones = {
        optimizationLevel: 3
    }

    src('src/img/**/*.{png,jpeg,jpg}')
        .pipe( cache(imagemin(opciones) ) )
        .pipe( dest('build/img'))
    done();
}

function versionWebp(done){

    //Calidad de las imagenes al convertir
    const opciones = {
        quality: 50
    }

    src('src/img/**/*.{png,jpeg,jpg}') //Entramos a todas las carpetas dentro de img y vemos todos los archivos que tengan esos formato
        .pipe( webp(opciones) )
        .pipe( dest('build/img')) //almacenamos
    done();
}

function versionAvif(done){

    //Calidad de las imagenes al convertir
    const opciones = {
        quality: 50
    }

    src('src/img/**/*.{png,jpeg,jpg}') //Entramos a todas las carpetas dentro de img y vemos todos los archivos que tengan esos formato
        .pipe( avif(opciones) )
        .pipe( dest('build/img')) //almacenamos
    done();
}

// Funcion para pasar los archivos de js a la carpeta build
function javascript(done){

    // Ubicamos el achivo de js y lo enviamos a build
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe( terser() )
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));

    done();
}

// Cuando cambie la hoja de estilos manda a llamar la funcion css, asi tomara los cambios de forma automatica en los archivos de sass
function dev(done){
    watch("src/scss/**/*.scss", css); //quedamos mirando todos los archivos sass para ejecutar los cambios de forma automatica
    watch("src/js/**/*.js", javascript); //quedamos mirando todos los archivos js para ejecutar los cambios de forma automatica

    done();
}

exports.css = css; //Mandamos a llamar la funcion
exports.js = javascript; //Mandamos a llamar la funcion
exports.imagenes = imagenes; //Mandamos a llamar la funcion
exports.versionWebp = versionWebp; //Mandamos a llamar la funcion para convertir imagenes
exports.versionAvif = versionAvif; //Mandamos a llamar la funcion para convertir imagenes
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev); //Llamamos la funcion que aplica el watch, esta es la que debemos ejecutar si queremos estar escuchando los cambios en el archivo de sass (ejecutariamos npx gulp dev), esto en paralelo ejecuta tambien la conversion de las imagenes a webp, y optimizar las imagenes con la funcion imagenes