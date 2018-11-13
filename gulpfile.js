let gulp = require('gulp'), //подключаем Gulp
  sass = require('gulp-sass'), // компиляция Sass
  uglifyJs = require('gulp-uglifyes'), //минификация JS
  autoPrefixer = require('gulp-autoprefixer'), // вендорные префиксы
  bs = require('browser-sync'), // сервер
  rename = require('gulp-rename'), // переименование файлов
  htmlMin = require ('gulp-htmlmin'), // минификация html
  delFiles = require ('del'), // удаление файлов
  cssMinify = require ('gulp-csso'), // минификация css
  babel = require ('gulp-babel'); // из es6 в es5

// Методы
// gulp.task() - создание новой задачи
// gulp.src() - указываем путь к файлам (выбор файлов)
// gulp.dest() - сохраняет файлы
// gulp.parallel() - параллельный запуск нескольких задач
// gulp.series() - определяет очерёдность выполняемых задач
// gulp.watch() - отслеживать изменения (следить за файлами)

gulp.task('test', ()=> {
  return console.log('Gulp works');
});

// задача, перетаскивающая все файлики html из app в dist, т.е. собирать наш итоговый проект

gulp.task('html', ()=>{
  // для работы с фалом, его нужно выбрать сначала
  return gulp.src('app/*.html')
  // теперь обработаем полученные файлы
    .pipe(htmlMin({collapseWhitespace: true})) //минифицируем фалы
    .pipe(gulp.dest('dist')) //сохраняем файлы в нашу лиректорию dist
});

gulp.task('sass', ()=>{
  return gulp.src('app/Styles/*.sass')
    .pipe(sass()) // преобразование в css
    .pipe(autoPrefixer()) // добавим вендорные префиксы
    .pipe(cssMinify()) // минифицируем наш CSS файл
    .pipe(gulp.dest('dist/Styles'))// помещаем в нашу итоговую директорию
});

gulp.task('img',()=>{
  return gulp.src('app/img/**/*.+(png|jpg)')
    .pipe(gulp.dest('dist/img'))
});

// перед апдейтом, надо чистить содержимое папочки
gulp.task('clean', ()=> {
  return delFiles(['dist/**', '!dist'])
});

gulp.task('js:es6', ()=>{
  return gulp.src('app/js/*.js')
  //рекомендация хранить в дистрибутиве не только минифицированный js, но и не сжатый
    .pipe(gulp.dest('dist/js'))
    // теперь минифицируем фалик
    .pipe(uglifyJs())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('js:babel', ()=> {
  return gulp.src('app/js/*.js')
    .pipe(babel({
      //передаём параметры настройки среды, мы её устанавливали
      presets: ['@babel/env']
    }))
    .pipe(rename({suffix: '.es5'}))
    .pipe(gulp.dest('dist/js'))
});

// перенесём bower components
gulp.task('bower',()=>{
  return gulp.src('app/bower_components/**/*.*')
    .pipe(gulp.dest('dist/bower_components'))
});

// перенесём json файл

gulp.task('json',()=>{
  return gulp.src('app/*.json')
    .pipe(gulp.dest('dist'))
});


// создадим сервер. CTRL+C в консоли, чтобы выключить и продолжить в ней работать

gulp.task('server', ()=>{
  return bs({
    browser: 'chrome',
    //указываем серверу из какой папки отображать
    server: {
      baseDir: 'dist'
    }
  })
});

gulp.task('html:watch', ()=>{
  return gulp.watch('app/*.html', gulp.series(('html'), (done) => {
    bs.reload();
    done()
  }))
});

gulp.task('sass:watch', ()=>{
  return gulp.watch('app/Styles/*.sass', gulp.series(('sass'), (done) => {
    bs.reload();
    done()
  }))
});

gulp.task('img:watch', ()=>{
  return gulp.watch('app/img/**/*.+(img|png)', gulp.series(('img'), (done) => {
    bs.reload();
    done()
  }))
});

gulp.task('js:watch', ()=>{
  return gulp.watch('app/js/*.js', gulp.series(('js:es6'), (done) => {
    bs.reload();
    done()
  }))
});

gulp.task('json:watch', ()=>{
  return gulp.watch('app/*.json', gulp.series(('json'), (done) => {
    bs.reload();
    done()
  }))
});

// определим задачу по умолчанию [список задач, которые будут выполнены] 'sass', 'html', 'clean' - но это старый
// синтаксис

gulp.task('default', gulp.series('clean', gulp.parallel('sass', 'html', 'img', 'js:es6', 'js:babel', 'bower', 'json',
  'server', 'html:watch', 'sass:watch', 'img:watch', 'js:watch', 'json:watch')));
