const {src, dest, watch} = require("gulp"); //Mandamos llamar a gulp (el que instalamos en el packaje.json), el require es una forma de extraerlo // Extraemos el source y destino de gulp

const sass = require("gulp-sass")(require("sass")); //Importamos sass, con la ayuda del conector que es gulp sass
const plumber = require("gulp-plumber"); //Extraemos la variable de plumber

function css(done){
    src("src/scss/**/*.scss") // Idenfitica todas las carpetas que esten dentro de scss y todos los archivos con esa extension
        .pipe( plumber() )
        .pipe( sass() ) // Compilarla
        .pipe( dest("build/css"))  // Almacenar en el destino
        //Los pipes son acciones

    done(); // Callback que avisa cuando llegamos al final
}

// Cuando cambie la hoja de estilos manda a llamar la funcion css, asi tomara los cambios de forma automatica en los archivos de sass
function dev(done){
    watch("src/scss/**/*.scss", css) //quedamos mirando todos los archivos sass para ejecutar los cambios de forma automatica

    done();
}

exports.css = css; //Mandamos a llamar la funcion
exports.dev = dev; //Llamamos la funcion que aplica el watch, esta es la que debemos ejecutar si queremos estar escuchando los cambios en el archivo de sass (ejecutariamos npx gulp dev)