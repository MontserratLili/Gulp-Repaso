//Hacemos los requerimientos necesarios de las dependencias que vamos a usar
//Requerimos gulp que es un conjunto de herramientas para automatizar tareas que consumen mucho tiempo
var gulp = require('gulp');
//Esta dependencia modifica nuestro código para minificarlo
var uglify = require('gulp-uglify');
//Esta dependencia modifica nuestro código para protegerlo de plagios
var obfuscate = require('gulp-obfuscate');
//Esta dependencia me permite procesar sass
var sass = require('gulp-sass');
//Dependencia que usa express para levantar un servidor sin necesidad de configurarlo manualmente
var browserSync= require('browser-sync');

//Establezco mis rutas en un objeto para usarlas multiples veces y tener un código limpio
var rutas = {
    js:"js/*.js",
    public:"public",
    sass:"./src/assets/scss/*.scss"
};

//Tarea que me permite minificar y ofuscar mi archivo js, enviarlo a la carpeta public para producción
gulp.task('processJS',function(){
   gulp.src(rutas.js)
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest(rutas.public))
});

//Tarea en la que automatizamos el rpocesamiento de sass enviando el archivo scss a public como css
gulp.task('processSASS', function(){
    gulp.src(rutas.sass)
    .pipe(sass({outputStyle: "compresed"}).on("error", sass.logError))
    .pipe(gulp.dest(rutas.public))
});

//levantamos el servidor y observamos los cambios en css para procesarlos. La carpeta base es dir, ahí esta index
gulp.task('watchChangesCSS', function(){
    browserSync.init({
        server:{
            baseDir: './public'
        }
    })
//LLamamos a la tarea creada que retomara los cambios que hemos hecho, se procesaron y se reflejan en el servidor
    gulp.watch(rutas.sass, ['sass-watch'])
});

//Tarea que invoca a la tarea de proceso de SASS y recarga los cambios en servidor 
gulp.task('sass-watch', ['processSASS'], function(){
    //recargamos el servidor automaticamente sin oprimir f5
    browserSync.reload();
});

//Tarea que copia el index.html de los archivos de desarrollo a la carpeta public
gulp.task('moveIndex',function(){
    gulp.src('*.html')
    .pipe(gulp.dest(rutas.public))
});